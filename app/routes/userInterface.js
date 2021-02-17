const express = require('express');
const router = express.Router();
const jobsModel = require('../models/jobsModel');

router.get('/', async function(req, res, next) {
    // TODO: user Interface logic goes here
    const data = await jobsModel.getAllJobs();
    res.render('userInterface/index', {title:'userInterface', data: data});
});

module.exports = router;
