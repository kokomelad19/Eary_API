const { Router } = require("express");
const {
  getProfileController,
  updateProfileController,
} = require("../controllers/profileController");
const authorizationMiddleware = require("../middlewares/authorization");
const validateRequest = require("../middlewares/validateRequest");
const { updateProfileSchema } = require("./validation_schemas/profile");

const profileRouter = Router();

// Get User Profile
profileRouter.get("/", authorizationMiddleware, getProfileController);

// Update Profile
profileRouter.patch(
  "/",
  validateRequest(updateProfileSchema),
  authorizationMiddleware,
  updateProfileController
);

module.exports = profileRouter;
