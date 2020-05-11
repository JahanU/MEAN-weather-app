const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var cors = require('cors')
require('dotenv/config');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Import routes
const locationRoutes = require('./routes/locations');

// Middlwares
app.use('/api/location', locationRoutes); // Whenever api/location endpoint is accessed, use locationRoutes

// Routes
app.get('/', (req, res) => {
    res.send('on home');
});

app.use((req, res, next) => { // Invalid URL
    const error = new Error('Not found');
    error.status = 404;
    next(error); // Forward error 
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

// Connect to DB 
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Succesfully connected to DB..');
});

app.listen(3000, () => console.log('starting server..'));

