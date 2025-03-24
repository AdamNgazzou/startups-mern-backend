const startupModel = require('../models/startup.model');
const mongoose = require('mongoose');
const Author = require('../models/author.model');
const { redisClient, DEFAULT_EXPIRATION } = require('../redis/redisClient');

//get all products
const getStartups = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit;
        const searchQuery = req.query.query || '';

        // Aggregation pipeline
        const matchStage = {
            $match: {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { category: { $regex: searchQuery, $options: 'i' } },
                    { author_id: { $regex: searchQuery, $options: 'i' } }
                ]
            }
        };

        const aggregationPipeline = [
            matchStage,
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'authors',
                    localField: 'author_id',
                    foreignField: 'id',
                    as: 'author'
                }
            },
            {
                $unwind: {
                    path: "$author",
                    preserveNullAndEmptyArrays: true // Keep startups even if they have no author
                }
            },
            {
                $project: {
                    _id: 1,
                    _createdAt: "$createdAt",
                    title: 1,
                    author: {
                        _ref: "$author.id",
                        name: "$author.name",
                        image: "$author.image"
                    },
                    views: 1,
                    description: 1,
                    category: 1,
                    image: 1
                }
            }
        ];

        const startups = await startupModel.aggregate(aggregationPipeline);
        const total = await startupModel.countDocuments(matchStage.$match);

        res.status(200).json({
            data: startups,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
        });
    } catch (error) {
        console.error("Error fetching startups:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//get single Author
const getStartup = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        let startup;
        let author;

        // see if the startup is already cached
        const cachedStartup = await redisClient.get(`startup:${id}`);
        if (cachedStartup) {
            console.log(`[${Date.now()}] Cache hit for startup ${id}`);
            startup = JSON.parse(cachedStartup);
        } else {
            // if it is not cached then fetch from MongoDB 
            startup = await startupModel.findById(id);  // Use findById for single document query
            if (!startup) {
                return res.status(404).json({ message: "Startup not found" });
            }
        }

        // see if the author is already cached
        const cachedAuthor = await redisClient.get(`author:${startup.author_id}`);
        if (cachedAuthor) {
            console.log(`[${Date.now()}] Cache hit for author ${startup.author_id}`);
            author = JSON.parse(cachedAuthor);
        } else {
            // if it is not cached then fetch from MongoDB 
            author = await Author.findOne({ id: startup.author_id });
        }

        res.status(200).json({
            startup: startup,
            author: author
        });

        res.on("finish", async () => {
            try {
                if (!cachedAuthor) {
                    await redisClient.setEx(`author:${startup.author_id}`, DEFAULT_EXPIRATION, JSON.stringify(author));
                    console.log(`[${Date.now()}] Data cached for author ${id}`);
                }
                if (!cachedStartup) {
                    await redisClient.setEx(`startup:${id}`, DEFAULT_EXPIRATION, JSON.stringify(startup));
                    console.log(`[${Date.now()}] Data cached for startup ${id}`);
                }
            } catch (err) {
                console.error("Failed to cache author:", err);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//get Startups of author
const getStartupsbyAuthor = async (req, res) => {
    try {
        // Convert id to ObjectId
        const startups = await startupModel.find({ author_id: req.query.github_id });
        const startupWithAuthors = await Promise.all(startups.map(async (startup) => {
            const author = await Author.findOne({ id: startup.author_id });
            return {
                _id: startup._id.toString(),
                _type: 'startup',
                _createdAt: startup.createdAt.toISOString(),
                _updatedAt: startup.updatedAt.toISOString(),
                _rev: startup._rev || '', // You may replace or remove this field if not relevant
                title: startup.title,
                author: author ? {
                    _ref: author.id,
                    _type: 'reference',
                    name: author.name,
                    username: author.username,
                    image: author.image,
                    bio: author.bio,
                } : null,
                views: startup.views,
                description: startup.description,
                category: startup.category,
                image: startup.image,
                pitch: startup.pitch,
            };
        }));
        res.status(200).json(startupWithAuthors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

///post a product
const createStartup = async (req, res) => {
    try {
        const startup = await startupModel.create(req.body);
        res.status(200).json(startup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update a product 
const updateStartup = async (req, res) => {
    try {
        const { id } = req.params;
        const startup = await startupModel.findByIdAndUpdate(id, req.body);
        if (!startup) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        const Updatedstartup = await startupModel.findById(id);
        res.status(200).json(Updatedstartup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete a product
const deleteStartup = async (req, res) => {
    try {
        const { id } = req.params;
        const startup = await startupModel.findByIdAndDelete(id);
        if (!startup) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json({ message: 'Author has been deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//export
module.exports = {
    getStartups,
    getStartup,
    getStartupsbyAuthor,
    createStartup,
    updateStartup,
    deleteStartup
};