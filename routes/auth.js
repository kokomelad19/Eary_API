const { Router } = require("express");
const {
  registerUserController,
  loginController,
} = require("../controllers/authController");
const { loginSchema, registerSchema } = require("./validation_schemas/auth");
const validateRequest = require("../middlewares/validateRequest");

const authRouter = Router();

// register
authRouter.post(
  "/register",
  validateRequest(registerSchema),
  registerUserController
);

// Login
authRouter.post("/login", validateRequest(loginSchema), loginController);

module.exports = authRouter;
