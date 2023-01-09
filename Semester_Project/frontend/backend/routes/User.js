const express = require("express");
const { body } = require("express-validator");
const userControllers = require("../controllers/User");
const Router = express.Router();

Router.post(
  "/createuser",
  body("email").isEmail(),
  body("password", "Incorrect Password").isLength({ min: 8 }),
  userControllers.postCreateUser
);

Router.post(
  "/loginuser",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  userControllers.postLoginUser
);

module.exports = Router;
