const { Router } = require("express");
const authorizationMiddleware = require("../middlewares/authorization");
const isActiveUserMiddleware = require("../middlewares/isActiveUser");
const isAdminMiddleware = require("../middlewares/isAdmin");
const validateRequest = require("../middlewares/validateRequest");
const { submitAnswerSchema } = require("./validation_schemas/submissions");
const { paginationSchema } = require("./validation_schemas/global");
const {
  submitAnswerController,
  getSubmissionsController,
} = require("../controllers/submissionsController");
const {
  getSubmissionDetailsController,
} = require("../controllers/submissionsController");

const submissionsRouter = Router();

// GLOBAL middlewares for this router
submissionsRouter.use(authorizationMiddleware, isActiveUserMiddleware);

// Submit Answer
submissionsRouter.post(
  "/submit-answers",
  validateRequest(submitAnswerSchema),
  submitAnswerController
);

// GET My history submissions
submissionsRouter.get(
  "/my-history",
  validateRequest(paginationSchema, "query"),
  getSubmissionsController
);

// GET User's Submissions By ID [ADMIN]
submissionsRouter.get(
  "/user/:userId",
  isAdminMiddleware,
  validateRequest(paginationSchema, "query"),
  getSubmissionsController
);

// GET Submission Details [USER , ADMIN]
submissionsRouter.get("/details/:submissionId", getSubmissionDetailsController);

module.exports = submissionsRouter;
