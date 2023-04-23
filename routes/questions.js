const { Router } = require("express");
const authorizationMiddleware = require("../middlewares/authorization");
const isAdminMiddleware = require("../middlewares/isAdmin");
const validateRequest = require("../middlewares/validateRequest");
const {
  uploadAudioFileMiddleware,
  validateAudioFileExistence,
} = require("../middlewares/audio_uploader");
const {
  createQuestionsWithAnswers,
} = require("./validation_schemas/questions");
const {
  createQuestionWithAnswersController,
} = require("../controllers/questionsController");

const questionsRouter = Router();

// GLOBAL middlewares for this router
questionsRouter.use(authorizationMiddleware);

// CREATE QUESTION [ADMIN]
questionsRouter.post(
  "/",
  isAdminMiddleware,
  uploadAudioFileMiddleware.single("audio_file"),
  validateAudioFileExistence,
  validateRequest(createQuestionsWithAnswers),
  createQuestionWithAnswersController
);

module.exports = questionsRouter;
