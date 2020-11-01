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
        type: Boolean,
        default: false
    }
});

const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;