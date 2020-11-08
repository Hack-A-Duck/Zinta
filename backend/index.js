require('dotenv').config()
const connectDB = require('./src/db/mongoose');
const express = require('express');
const blogRouter = require('./src/routers/blog');
const feedbackRouter = require('./src/routers/feedback');
const path = require('path');
connectDB();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(blogRouter);
app.use(feedbackRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});