const express = require("express");
const router = express.Router();
const {
  createComment,
  getAllBlogsForUserForComment,
} = require("./commentController");
const Validator = require("./validator");

router.route("/createComments").post(Validator("createComment"), createComment);
// router
//   .route("/api/comment/getAllBlogsForUserForComment/:blogId/:userId")
//   .get(Validator("createBlogPostForComment"), getAllBlogsForUserForComment);
router
  .route("/getAllBlogsForUserForComment/:blogId")
  .get(getAllBlogsForUserForComment);


module.exports = router;
