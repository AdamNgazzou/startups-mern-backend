const express = require("express");
const StartupModel = require("../models/startup.model");
const router = express.Router();
const { getStartups, getStartup, getStartupsbyAuthor, createStartup, updateStartup, deleteStartup } = require("../controllers/startup.controller");

// route get all startup 
router.get('/', getStartups);
// route get single startup based on id
router.get('/user/:id', getStartup);
// route get single startups from author 
router.get('/user/', getStartupsbyAuthor);
// route create startup
router.post('/', createStartup);
// route update startup
router.put('/:id', updateStartup);
// route delete startup
router.delete('/:id', deleteStartup);




module.exports = router;