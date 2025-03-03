const startupModel = require('../../backend/models/startup.model');
const { getStartups, getStartup, getStartupsbyAuthor, createStartup, updateStartup, deleteStartup } = require('../../backend/controllers/startup.controller');

const handler = (req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.query.github_id) {
                return getStartupsbyAuthor(req, res);
            } else if (req.query.id) {
                return getStartup(req, res);
            } else {
                return getStartups(req, res);
            }
        case 'POST':
            return createStartup(req, res);
        case 'PUT':
            return updateStartup(req, res);
        case 'DELETE':
            return deleteStartup(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

module.exports = handler;