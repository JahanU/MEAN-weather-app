const mongoose = require('mongoose'); // Connect to DB

// Create Object/Schema
const locationSchema = mongoose.Schema({
    locationName: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 1,
    }
});

// Name of the schema we will save in MongoDB
module.exports = mongoose.model('locations', locationSchema);