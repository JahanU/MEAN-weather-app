const express = require('express');
const router = express.Router();
const Location = require('../models/locationModel');
require('dotenv/config');
const fetch = require("node-fetch");

const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

router.get('/', async (req, res) => {
    console.log('received query at location');
    try {
        weatherUrl.searchParams.set('q', req.query.locationName);
        weatherUrl.searchParams.append('units', 'metric');
        weatherUrl.searchParams.append('appid', WEATHER_API_KEY);
        const response = await fetch(weatherUrl.href);
        const resJson = await response.json();
        if (resJson.cod == 200) { // Succesful
            res.send(resJson);
        }
        else { // 404 error, city not found
            res.send(err);
        }
    }
    catch (err) {
        res.send(err + ',\nthis is an Internal error');
    }
});


router.post('/', async (req, res) => {

});

module.exports = router; // Export this as a module, so we can use it in our index.