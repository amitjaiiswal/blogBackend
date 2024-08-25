const express = require("express");
const {
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
  createBlogPost,
  getAllBlogPosts,
  getAllBlogPostsForUser,
} = require("../../query/userQuery");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
const getMessage = require("../../message");
require("dotenv").config();

exports.createBlog = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    console.log("userd", userId);
    const result = await createBlogPost(title, content, userId);

    if (!result || result.length < 1) {
      return errorHandler({
        res,
        statusCode: 400,
        message: getMessage("M008"),
      });
    }

    return successHandler({
      res,
      data: result,
      statusCode: 201,
      message: getMessage("M007"),
    });
  } catch (error) {
    return errorHandler({
      res,
      statusCode: 500,
      message: error.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const result = await updateBlogPost(id, title, content);

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
      message: getMessage("M010"), // Successfully updated message
    });
  } catch (error) {
    return errorHandler({
      res,
      statusCode: 500,
      message: error.message,
    });
  }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteBlogPost(id);

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
      message: getMessage("M011"), // Successfully deleted message
    });
  } catch (error) {
    return errorHandler({
      res,
      statusCode: 500,
      message: error.message,
    });
  }
};

// Get a specific blog post
exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getBlogPostById(id);

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

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const result = await getAllBlogPosts();

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

// Get all blog posts for User
exports.getAllBlogsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getAllBlogPostsForUser(userId);

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

