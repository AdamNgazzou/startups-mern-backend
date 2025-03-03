const authorModel = require('../../backend/models/author.model');
const { getAuthors, getAuthor, getAuthorgithub, createAuthor, updateAuthor, deleteAuthor } = require('../../backend/controllers/author.controller');

const handler = (req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.query.github_id) {
                return getAuthorgithub(req, res);
            } else if (req.query.id) {
                return getAuthor(req, res);
            } else {
                return getAuthors(req, res);
            }
        case 'POST':
            return createAuthor(req, res);
        case 'PUT':
            return updateAuthor(req, res);
        case 'DELETE':
            return deleteAuthor(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

module.exports = handler;