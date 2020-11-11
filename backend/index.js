require('dotenv').config()
const connectDB = require('./src/db/mongoose');
const express = require('express');
const blogRouter = require('./src/routers/blog');
const feedbackRouter = require('./src/routers/feedback');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(cors());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(blogRouter);
app.use(feedbackRouter);


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
