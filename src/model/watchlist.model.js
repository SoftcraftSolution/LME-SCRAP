// models/watchlist.model.js
const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,  // It's a good practice to enforce this
    },
    baseMetalIds: [{  // Change this to an array of ObjectIds
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BaseMetal',  // Assuming BaseMetal is the correct model name
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
module.exports = Watchlist;
