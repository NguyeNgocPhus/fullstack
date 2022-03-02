const express = require("express");
const authController = require("./auth.controller");
const { validate } = require("express-validation");

const authValidation = require("./auth.validator");
const { isAuthenticated } = require("../../middleware/authentication");
const router = express.Router();

router.post("/login", validate(authValidation.login), authController.login);
router.get("/user", isAuthenticated(), authController.getUser);
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
module.exports = router;
