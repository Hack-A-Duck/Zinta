require('dotenv').config()
const connectDB = require('./src/db/mongoose');
const express = require('express');
const blogRouter = require('./src/routers/blog');
const feedbackRouter = require('./src/routers/feedback');
connectDB();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(blogRouter);
app.use(feedbackRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});