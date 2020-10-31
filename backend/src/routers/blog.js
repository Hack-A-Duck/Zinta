const express = require('express');
const Blog = require('../models/blog');
const router = new express.Router();

// Getting all blogs
router.get('', async (req, res) => {
    try {
        var blogs = await Blog.find();
        res.send(blogs);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Creating new blog
router.post('', async (req, res) => {
    const blog = new Blog(req.body);
    try {
        await blog.save();
        res.status(201).send({blog});
    } catch (e) {
        res.status(400).send(e);
    }
});

// Toggling visibility
router.post('', async (req,res) => {
    var newVisibility = {
        "visibility": req.body.visibility // CHECK WHETHER THIS LINE IS OK? 
    }
    var Blog = await Blog.findByIdAndUpdate(req.body.id, newVisibility);
    return res.send("Visibility changed!");
});

// Adding comment
router.post('', async (req, res) => {
    var blog = await Blog.findById(req.body.id);
    blog.comments.push(req.body.comment);
    try {
        await blog.save();
        res.status(201).send({blog});
    } catch (e) {
        res.status(400).send(e);
    }
});

// Updating blog
router.patch('', async (req, res) => {
    try {
        var blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({blog});
    } catch (e) {
        res.status(400).send(e);
    }
});

// Deleting blog
router.delete('', async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    try {
        if(!blog)
            return res.status(404).send();
        res.send({blog});
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
