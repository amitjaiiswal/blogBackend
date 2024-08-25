const express = require("express");
const { createBlogPostComment, getAllBlogPostsForUserForComment } = require("../../query/userQuery");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
const getMessage = require("../../message");
require("dotenv").config();

exports.createComment = async (req, res) => {
  try {
    const { comments, userId, blogId } = req.body;

    const result = await createBlogPostComment(comments, userId, blogId);

    if (!result || result.length < 1) {
      return errorHandler({
        res,
        statusCode: 400,
        message: getMessage("M013"),
      });
    }

    return successHandler({
      res,
      data: result,
      statusCode: 201,
      message: getMessage("M014"),
    });
  } catch (error) {
    return errorHandler({
      res,
      statusCode: 500,
      message: error.message,
    });
  }
};


// Get all comment for User
exports.getAllBlogsForUserForComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    console.log("blogId:", blogId); // Debug log
    const result = await getAllBlogPostsForUserForComment(blogId);

    if (!result || result.length < 1) {
      return errorHandler({
        res,
        statusCode: 404,
        message: getMessage("M009"), // Post not found message
      });
    }

    return successHandler({
      res,
      data: result,
      statusCode: 200,
      message: getMessage("M012"), // Successfully fetched message
    });
  } catch (error) {
    return errorHandler({
      res,
      statusCode: 500,
      message: error.message,
    });
  }
};

