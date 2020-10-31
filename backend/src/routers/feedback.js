const express = require('express');
const Feedback = require('../models/feedback');
const router = new express.Router();

// Getting all feedbacks
router.get('/api/get-feedbacks', async (req, res) => {
    try {
        var feedbacks = await Feedback.find();
        res.send(feedbacks);
    } catch (e) {
        res.status(400).send(e);
    }
});

// New feedback
router.post('/api/create-feedback', async (req, res) => {
    const feedback = new Feedback(req.body);
    try {
        await feedback.save();
        res.status(201).send({feedback});
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;