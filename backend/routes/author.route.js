const express = require("express");
const authorModel = require("../models/author.model");
const router = express.Router();
const { getAuthors, getAuthor, getAuthorgithub, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/author.controller");

// route get all Authors 
router.get('/', getAuthors);
// route get single author based on id
router.get('/user/:id', getAuthor);
// route get single author based on id
router.get('/user/', getAuthorgithub);
// route create author
router.post('/', createAuthor);
// route update author
router.put('/:id', updateAuthor);
// route delete author
router.delete('/:id', deleteAuthor);




module.exports = router;