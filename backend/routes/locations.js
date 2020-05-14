const express = require('express');
const router = express.Router();
const Location = require('../models/locationModel'); // Allows us to save to DB
require('dotenv/config');
const fetch = require("node-fetch");

const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;


router.get('/', async (req, res) => {
    console.log('GET: received query at location');
    try {
        weatherUrl.searchParams.set('q', req.query.locationName);
        weatherUrl.searchParams.append('units', 'metric');
        weatherUrl.searchParams.append('appid', WEATHER_API_KEY);
        const response = await fetch(weatherUrl.href);
        const resJson = await response.json();
        if (resJson.cod == 200) { // Succesful
            await saveOrUpdateToDB(req.query.locationName);
            res.send(resJson);
        }
        else { // 404 error, city not found
            res.send(err);
        }
    }
    catch (err) {
        res.send(err + ',\nGET-LOCATION: This is an Internal error');
    }
});

var saveOrUpdateToDB = async (locationName) => {
    const location = new Location({ locationName: locationName });

    try {
        const findLocation = await Location.find({ locationName: locationName });

        if (findLocation.length > 0) { // Already exist in DB, update count value
            await Location.findOneAndUpdate(
                { locationName: findLocation[0].locationName },
                { count: findLocation[0].count + 1 },
            );
        }
        else {
            await location.save();
        }
    }
    catch (err) {
        console.log(err + '\nSAVE/UPDATE TO DB: This is an Internal error');
    }
}


router.get('/all', async (req, res) => {
    console.log('GET-ALL: received query at location/all');
    try {
        const allLocations = await Location.find();
        res.send(allLocations);
    }
    catch (err) {
        res.send(err.message + ' Could not find any rows in DB');
    }
});

module.exports = router; // Export this as a module, so we can use it in our index.