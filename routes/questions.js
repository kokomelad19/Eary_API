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
  updateQuestionsWithAnswers,
  getAllQuestionsFilterForAdminSchema,
} = require("./validation_schemas/questions");
const {
  createQuestionWithAnswersController,
  getQuestionsWithAnswersController,
  deleteQuestionController,
  updateQuestionWithAnswersController,
} = require("../controllers/questionsController");

const questionsRouter = Router();

// GLOBAL middlewares for this router
questionsRouter.use(authorizationMiddleware, isActiveUserMiddleware);

// GET ALL Questions [USER , ADMIN]
questionsRouter.get(
  "/",
  validateRequest(getAllQuestionsFilterForAdminSchema, "query"),
  getQuestionsWithAnswersController
);

// CREATE QUESTION [ADMIN]
questionsRouter.post(
  "/",
  isAdminMiddleware,
  uploadAudioFileMiddleware.single("audio_file"),
  validateAudioFileExistence,
  validateRequest(createQuestionsWithAnswers),
  createQuestionWithAnswersController
);

// DELETE Question [ADMIN]
questionsRouter.delete(
  "/:questionId",
  isAdminMiddleware,
  deleteQuestionController
);

// UPDATE Question [ADMIN]
questionsRouter.put(
  "/:questionId",
  isAdminMiddleware,
  uploadAudioFileMiddleware.single("audio_file"),
  validateRequest(updateQuestionsWithAnswers),
  updateQuestionWithAnswersController
);

module.exports = questionsRouter;
