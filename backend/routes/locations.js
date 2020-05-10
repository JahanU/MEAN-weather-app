const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
require('dotenv/config');
const fetch = require("node-fetch");


const url = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// const TIME_API_KEY: 'GVK27JSUNMGC'

router.get('/', async (req, res) => {

    console.log('received query!');
    console.log(req.query);
    try {
        const response = await fetch(url +
            '?q=' + req.query.locationName +
            '&units=' + 'metric' +
            '&appid=' + WEATHER_API_KEY);
        console.log(response.url);
        const resJson = await response.json();
        res.send(resJson);
    }
    catch (err) {
        res.send(err + ' Invalid location');
    }
});


router.get('/', (req, res) => {
    res.send('on home location');
});


router.post('/', async (req, res) => {

    console.log('received query!');
    console.log(req.query);
    try {
        const response = await fetch(url +
            '?q=' + req.query.locationName +
            '&units=' + 'metric' +
            '&appid=' + WEATHER_API_KEY);
        console.log(response.url);
        const resJson = await response.json();
        res.send(resJson);
    }
    catch (err) {
        res.send(err + ' Invalid location');
    }

});

module.exports = router;