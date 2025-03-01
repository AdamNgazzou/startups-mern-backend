const startupModel = require('../models/startup.model');
const mongoose = require('mongoose');

//get all products
const getStartups = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const searchQuery = req.query.query || ''; // Get the search query from the request
        console.log("search", req.query);
        let startups = [];

        // Step 1: Search by title
        startups = await startupModel.find({ title: { $regex: searchQuery, $options: 'i' } })
            .skip(skip)
            .limit(limit);

        // Step 2: If no results found by title, search by category
        if (startups.length === 0) {
            startups = await startupModel.find({ category: { $regex: searchQuery, $options: 'i' } })
                .skip(skip)
                .limit(limit);
        }

        // Step 3: If no results found by category, search by author
        if (startups.length === 0) {
            startups = await startupModel.find({ author: { $regex: searchQuery, $options: 'i' } })
                .skip(skip)
                .limit(limit);
        }

        // Count the total number of documents (for pagination metadata)
        const total = await startupModel.countDocuments();

        // Send the response with paginated data and metadata
        res.status(200).json({
            data: startups,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
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
        console.log("id2",id);
        const Startup = await startupModel.findById(id);
        res.status(200).json(Startup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//get Startups of author
const getStartupsbyAuthor = async (req, res) => {
    try {
        // Convert id to ObjectId
        console.log("authorstartup", req.query);
        const startups = await startupModel.find({ author_githubid: req.query.github_id });
        console.log(startups);
        res.status(200).json(startups);
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