const mongoose = require('mongoose');

// Define the schema for metal data
const metalSchema = new mongoose.Schema({
    name: String,
    latestPrice: String,
    riseFall: String,
    risefall: String,
    highest: String,
    lowest: String,
    yesterdayHarvest: String,
    updateTime: String,
}, { timestamps: true });

// Create and export the model
const Metal = mongoose.model('LMESCRAP', metalSchema);
module.exports = Metal;
