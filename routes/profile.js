const { Router } = require("express");
const {
  getProfileController,
  updateProfileController,
} = require("../controllers/profileController");
const authorizationMiddleware = require("../middlewares/authorization");
const validateRequest = require("../middlewares/validateRequest");
const updateProfileSchema = require("./validation_schemas/profile/updateProfile");

const profileRouter = Router();

// Get User Profile
profileRouter.get("/", authorizationMiddleware, getProfileController);

// Update Profile
profileRouter.put(
  "/",
  authorizationMiddleware,
  validateRequest(updateProfileSchema),
  updateProfileController
);

module.exports = profileRouter;
