const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

router.get('/', (req, res) => {
    var queryParams = req.query;
    res.json(queryParams);
    console.log('Location API!', queryParams);
});


router.get('/', (req, res) => {
    res.send('on home location');
});


router.post('/', (req, res) => {
    const location = new Location({

    })
});

module.exports = router;