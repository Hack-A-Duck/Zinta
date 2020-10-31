const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    checkbox: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0
    },
    date: {
      type: Date,
      default: Date.now
    }
});

const Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;