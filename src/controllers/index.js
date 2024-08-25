const express = require("express");
const userRouter = require("./userCredential/index")
const blogRouter = require("./addBlog/index")
const commentRouter = require("./comment/index")

const app = express();

app.use("/posts", userRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

module.exports = app;
