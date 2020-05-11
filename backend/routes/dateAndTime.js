const express = require('express');
const router = express.Router();
require('dotenv/config');
const fetch = require("node-fetch");

const weatherUrl = new URL('http://api.timezonedb.com/v2.1/get-time-zone');
const TIME_API_KEY = process.env.TIME_API_KEY;

router.get('/', async (req, res) => {
    console.log('received query at time');
    console.log(req.query);
    try {
        weatherUrl.searchParams.set('key', TIME_API_KEY);
        weatherUrl.searchParams.set('format', 'json');
        weatherUrl.searchParams.set('by', 'position');
        weatherUrl.searchParams.set('lat', req.query.lat);
        weatherUrl.searchParams.set('lng', req.query.lng);

        const response = await fetch(weatherUrl.href);
        const resJson = await response.json();
        console.log(resJson);
        if (resJson.status == 'OK') { // Succesful
            res.send(resJson);
        }
        else { // 404 error, not found
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