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

//Getting all the visible blogs
router.get('/api/get-visible-blogs', async (req, res) => {
    try {
        var blogs = await Blog.find({visibility: "true"});
        res.status(200).send(blogs);
    } catch (e) {
        res.status(400).send(e);
    }
});

//Getting blog by id
router.get('/api/get-blog/:id', async (req, res) => {
    try {
        var blog = await Blog.find({_id: req.params.id});
        res.status(200).send(blog);
    } catch (e) {
        res.status(400).send(e);
    }
})

// Saving updated layout
router.patch('/api/save-layout', async (req, res) => {
    var updatedBlogs = req.body.blogs;
    try {

        await updatedBlogs.map(async (current) => {
            const updatedInfo = {
              w: current.w,
              h: current.h,
              x: current.x,
              y: current.y,
            };
            
            await Blog.findByIdAndUpdate(current.i, updatedInfo);
        });

        res.status(201).send({status: "201"});

    } catch (e) {
        res.status(400).send({status: "400"});
    }
})

// Creating new blog
router.post('/api/create-blog', async (req, res) => {
    var blog = new Blog(req.body);
    if(Object.keys(req).indexOf("file") !== -1){
        blog["thumbnail"] = req.file.buffer; 
    }
    try {
        await blog.save();
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
    var updateData = req.body
    updateData["date"] = Date.now()
    if(Object.keys(req).indexOf("file") !== -1){
        blog["thumbnail"] = req.file.buffer; 
    }
    try {
        const blog = await Blog.findById(req.body.id);
        const previousVisibility = blog["visibility"]
        if (updateData["visibility"] === "true" && previousVisibility === "false"){
            const blogPosition = findNewPosition();
            newData = {...newData, ...blogPosition};
        }
        await Blog.findByIdAndUpdate(req.body.id, updateData);
        res.status(200).send({status: "200"});
    } catch (e) {
        res.status(400).send({status: "400", error: e});
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
