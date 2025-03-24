// filepath: /c:/Users/LENOVO/Desktop/Projects2024/Next js projects/pitchify/startups/backend/controllers/author.controller.js
const authorModel = require('../models/author.model');
const { redisClient, DEFAULT_EXPIRATION } = require('../redis/redisClient');

//get all products
const getAuthors = async (req, res) => {
    try {
        const authors = await authorModel.find({});
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get single product
const getAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        // Try to get data from cache
        const cachedAuthor = await redisClient.get(`author:${id}`);
        if (cachedAuthor) {
            console.log(`[${Date.now()}] Cache hit for author ${id}`);
            return res.json(JSON.parse(cachedAuthor));
        }

        //if not then get from MongoDB database
        author = await authorModel.find({ id: id });
        res.status(200).json(author);
        res.on("finish", async () => {
            try {
                await redisClient.setEx(`author:${id}`, DEFAULT_EXPIRATION, JSON.stringify(author));
                console.log(`[${Date.now()}] Data cached for author ${id}`);
            } catch (err) {
                console.error("Failed to cache author:", err);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

///post a product
const createAuthor = async (req, res) => {
    try {
        console.log("Received request body:", req.body); // Add this line
        const author = await authorModel.create(req.body);
        console.log("Author created:", author);
        console.log("3aslema");
        res.status(200).json(author);
    } catch (error) {
        console.error("Error creating author:", error); // Add this line
        res.status(500).json({ message: error.message });
    }
};

//update a product 
const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await authorModel.findByIdAndUpdate(id, req.body);
        if (!author) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        const UpdatedAuthor = await authorModel.findById(id);
        res.status(200).json(UpdatedAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete a product
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await authorModel.findByIdAndDelete(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json({ message: 'Author has been deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//export
module.exports = {
    getAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
};