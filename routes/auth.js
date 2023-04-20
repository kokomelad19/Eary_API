const { Router } = require("express");
const { registerUser } = require("../controllers/authController");
const { registerSchema } = require("./validation_schemas/auth/registerUser");
const { validateRequest } = require("../middlewares/validateRequest");

const authRouter = Router();

// register
authRouter.post(
  "/register",
  validateRequest(registerSchema, "body"),
  registerUser
);

module.exports = authRouter;
