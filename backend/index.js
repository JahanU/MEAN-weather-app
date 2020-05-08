const express = require('express');

const app = express();

// Middlwares


// Routes

app.get('/api/location', (req, res) => {

    var queryParams = req.query;
    res.json(queryParams);

    console.log(queryParams);

    // res.send('location');
})


app.get('/', (req, res) => {
    res.send('on home');
});


app.listen(3000, () => console.log('starting server..'));

// app.use(express);