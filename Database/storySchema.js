const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    createdAt : {
        type: Date
    },
    text : {
        type: String,
        required : true
    },
    author : {
        type : Object
    }
});

module.exports = mongoose.model('stories', storySchema);