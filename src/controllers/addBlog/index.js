const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getAllBlogs,
  getAllBlogsForUser,
} = require("./addBlogController");
const Validator = require("./validator");

router.route("/createPosts").post(Validator("createBlogPost"), createBlog);
router.put("/updatePosts/:id", updateBlog);
router.delete("/deletePosts/:id", deleteBlog);
router.get("/getBlogPosts/:id", getBlog);
router.get("/getAllPosts", getAllBlogs);
router.get("/getAllPostsForUser/:userId", getAllBlogsForUser);

module.exports = router;
