const authorModel = require('../models/author.model');

//get all products
const getAuthors = async (req, res) => {
    try {
        const authors = await authorModel.find({});
        console.log(authors);
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get single product
const getAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        author = await authorModel.find({ id: id });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//get author by github id
const getAuthorgithub = async (req, res) => {
    try {
        console.log(req.query);
        author = await authorModel.find({ github_id: req.query.github_id });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



///post a product
const createAuthor = async (req, res) => {
    try {
        const author = await authorModel.create(req.body);
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
    getAuthorgithub,
    createAuthor,
    updateAuthor,
    deleteAuthor
};