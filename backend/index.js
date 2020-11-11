require("dotenv").config();
const connectDB = require("./src/db/mongoose");
const express = require("express");
const blogRouter = require("./src/routers/blog");
const feedbackRouter = require("./src/routers/feedback");
const cors = require("cors");
const bodyParser = require("body-parser");
connectDB();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(blogRouter);
app.use(feedbackRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
