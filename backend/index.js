const express = require('express'); // Web server
const app = express();
const mongoose = require('mongoose'); // Connect to DB
const bodyParser = require('body-parser'); // Parse body data; JSON data
const morgan = require('morgan'); // Log all API calls
var cors = require('cors') // Enable Cross-origin resource sharing (Access from any IP)
require('dotenv/config'); // Init .env file

app.use(express.static('client'));

app.use(bodyParser.json()); // Parse ALL data
app.use(cors());
app.use(morgan('dev'));

// Import routes
const locationRoutes = require('./routes/locations');
const dateAndTimeRoutes = require('./routes/dateAndTime');

// Middlwares
app.use('/api/location', locationRoutes); // Whenever api/location endpoint is accessed, use locationRoutes
app.use('/api/time-date', dateAndTimeRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('on home');
});

app.get('/test', (req, res) => {
    console.log('test endpoint!');
    res.send('test endpoint!');
});

app.use((req, res, next) => { // Invalid URL / No endpoint was found
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


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log('Succesfully connected to DB..');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('starting server at..', PORT));