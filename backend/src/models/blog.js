const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        trim: true
    },
    thumbnail: {
        type: Buffer
    },
    comments: [{
        type: String
    }],
    visibility: {
        type: String,
        default: "false"
    },
    date: {
        type: Date,
        default: Date.now
    },
    x: {
        type: Number,
        default: 0
    },
    y: {
        type: Number,
        default: 0
    },
    w: {
        type: Number,
        default: 4
    },
    h: {
        type: Number,
        default: 4
    }
});

const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;