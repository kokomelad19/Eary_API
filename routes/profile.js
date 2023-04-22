const { Router } = require("express");
const authenticate = require("../middlewares/authentication");

const profileRouter = Router();

// Protected Route
profileRouter.use(authenticate);

// GET My Profile [USER , ADMIN]

// Update profile [USER , ADMIN]

module.exports = profileRouter;
