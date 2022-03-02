const express = require("express");
const { isAuthenticated } = require("../../middleware/authentication");
const profileController = require("./profile.controller");
const { validate } = require("express-validation");
const profileValidator = require("./profile.validator");
const router = express.Router();

router.get("/me", isAuthenticated(), profileController.me);
router.get("/all", profileController.getAllProfile);

router.post(
  "/",
  validate(profileValidator.createProfile),
  isAuthenticated(),
  profileController.createProfile
);
router.put(
  "/experience",
  validate(profileValidator.updateExperience),
  isAuthenticated(),
  profileController.addExperience
);
router.put(
  "/education",
  validate(profileValidator.updateEducation),
  isAuthenticated(),
  profileController.addEducation
);
router.get("/user/:id", profileController.getProfile);

module.exports = router;
