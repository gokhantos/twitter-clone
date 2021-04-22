const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    meta: {
        shares: Number,
        favs: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);