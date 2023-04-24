const { Router } = require("express");
const authorizationMiddleware = require("../middlewares/authorization");
const isActiveUserMiddleware = require("../middlewares/isActiveUser");
const isAdminMiddleware = require("../middlewares/isAdmin");
const validateRequest = require("../middlewares/validateRequest");
const { submitAnswerSchema } = require("./validation_schemas/submissions");
const {
  submitAnswerController,
} = require("../controllers/submissionsController");

const submissionsRouter = Router();

// GLOBAL middlewares for this router
submissionsRouter.use(authorizationMiddleware, isActiveUserMiddleware);

// Submit Answer
submissionsRouter.post(
  "/submit-answers",
  validateRequest(submitAnswerSchema, "body", true),
  submitAnswerController
);

module.exports = submissionsRouter;
