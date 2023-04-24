const { Router } = require("express");
const authorizationMiddleware = require("../middlewares/authorization");
const isAdminMiddleware = require("../middlewares/isAdmin");
const validateRequest = require("../middlewares/validateRequest");
const isActiveUserMiddleware = require("../middlewares/isActiveUser");
const {
  uploadAudioFileMiddleware,
  validateAudioFileExistence,
} = require("../middlewares/audio_uploader");
const {
  createQuestionsWithAnswers,
} = require("./validation_schemas/questions");
const {
  createQuestionWithAnswersController,
  getQuestionsWithAnswersController,
  deleteQuestionController,
} = require("../controllers/questionsController");

const questionsRouter = Router();

// GLOBAL middlewares for this router
questionsRouter.use(authorizationMiddleware, isActiveUserMiddleware);

// CREATE QUESTION [ADMIN]
questionsRouter.post(
  "/",
  isAdminMiddleware,
  uploadAudioFileMiddleware.single("audio_file"),
  validateAudioFileExistence,
  validateRequest(createQuestionsWithAnswers),
  createQuestionWithAnswersController
);

// GET ALL Questions [USER , ADMIN]
questionsRouter.get("/", getQuestionsWithAnswersController);

// DELETE Question [ADMIN]
questionsRouter.delete(
  "/:questionId",
  isAdminMiddleware,
  deleteQuestionController
);

module.exports = questionsRouter;
