const express = require('express');
const Blog = require('../models/blog');
const router = new express.Router();

// Getting all blogs
router.get('/api/get-blogs', async (req, res) => {
    try {
        var blogs = await Blog.find({});
        res.send(blogs);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Creating new blog
router.post('/api/create-blog', async (req, res) => {
    var blog = new Blog(req.body);
    try {
        await blog.save();
        var thumbnail = {
            "thumbnail": req.file.buffer
        }
        blog = await Blog.findByIdAndUpdate(req.body.id, thumbnail);
        res.status(201).send({status: "201"});
    } catch (e) {
        res.status(400).send({status: "400", error: e});
    }
});

async function findNewPosition(blogPosition) {
    blogPosition = {
        "x": 0,
        "y": 0,
        "w": 4,
        "h": 4
    }
    try {
        var blogs = await Blog.find({"visibility": "true"});
    } catch (e) {
        return blogPosition;
    }
    for(blog in blogs){
        blogPosition["y"] = max(blogPosition["y"], blog["y"] + blog["h"]);
    }
    return blogPosition;
}

// Toggling visibility
router.patch('/api/toggle-visibility', async (req,res) => {
    // id of blog
    const newVisibility = req.body.visibility == "true" ? "false": "true";
    var newData = {
        "visibility": newVisibility
    }
    if (newVisibility == "true"){
        const blogPosition = findNewPosition();
        newData = {...newData, ...blogPosition};
    }

    try {
        var Blog = await Blog.findByIdAndUpdate(req.body.id, newData);
        res.status(200).send("Visibility changed!");
    } catch (e) {
        res.status(400).send(e);
    }
});

// Adding comment
router.post('/api/add-comment', async (req, res) => {
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
router.patch('/api/update-blog', async (req, res) => {
    try {
        var blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({blog});
    } catch (e) {
        res.status(400).send(e);
    }
});

// Deleting blog
router.delete('/api/delete-blog', async (req, res) => {
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
