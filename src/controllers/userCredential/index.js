const express = require("express");
const router = express.Router();
const { loginUser, createUser } = require("./userController");
const verifyToken = require('../../middleware/authMiddleware');
const Validator = require("./validator");

router.route("/login").post(loginUser);
router.route("/register").post(createUser);
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello user ${req.userId}` });
});
module.exports = router;
