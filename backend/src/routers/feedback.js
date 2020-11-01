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
        res.status(201);
    } catch (e) {
        res.status(400).send(e);
    }
});

//Delete feedback
router.delete('/api/delete-feedback', async (req, res) => {
    const feedback = await Feedback.findByIdAndDelete(req.body._id);
    try {
        if(!feedback)
            return res.status(404);

        res.status(200);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;