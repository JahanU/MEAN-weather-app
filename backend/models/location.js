const mongoose = require('mongoose'); // Connect to DB

// Create Object/Schema
const locationSchema = mongoose.Schema({
    locationName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('locations', locationSchema);