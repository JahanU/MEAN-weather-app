const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// Import routes
const locationRoutes = require('./routes/locations');

app.use(bodyParser.json());
// Middlwares
app.use('/api/location', locationRoutes); // Whenever api/location endpoint is accessed, use locationRoutes

// Routes
app.get('/', (req, res) => {
    res.send('on home');
});


// Connect to DB 
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Succesfully connected to DB..');
});

app.listen(3000, () => console.log('starting server..'));

// app.use(express);