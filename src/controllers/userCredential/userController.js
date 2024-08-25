const express = require("express");
const { createUser, getUserByEmail } = require("../../query/userQuery");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
const getMessage = require("../../message");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user || user.length < 1) {
      return errorHandler({
        res,
        statusCode: 401,
        message: getMessage("M001"),
      });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return errorHandler({
        res,
        statusCode: 401,
        message: getMessage("M002"),
      });
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return successHandler({
      res,
      data: { token, user: { id: user[0].id, email: user[0].email } },
      statusCode: 200,
      message: getMessage("M003"),
    });
  } catch (error) {
    return errorHandler({
      res,
      statusCode: 500,
      message: error.message,
    });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser && existingUser.length > 0) {
      return errorHandler({
        res,
        statusCode: 400,
        message: getMessage("M004"),
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await createUser(name, email, hashedPassword);

    if (!result || result.length < 1) {
      return errorHandler({
        res,
        statusCode: 400,
        message: getMessage("M005"),
      });
    }

    return successHandler({
      res,
      data: result,
      statusCode: 201,
      message: getMessage("M006"),
    });
  } catch (error) {
    return errorHandler({
      res,
      statusCode: 500,
      message: error.message,
    });
  }
};


