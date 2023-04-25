const catchAsync = require("../utils/catchAsync");
const {
  createQuestionWithAnswersService,
  getQuestionsWithAnswersService,
  deleteQuestionService,
  updateQuestionWithAnswersService,
} = require("../services/questionsService");
const Questions = require("../database/entities/questions");
const QuestionAnswers = require("../database/entities/questionAnswers");
const HttpStatus = require("../constants/statusCodes");
const { userTypes } = require("../types/enums/users");

exports.createQuestionWithAnswersController = catchAsync(async (req, res) => {
  await createQuestionWithAnswersService(
    new Questions(req.body),
    req.body.answers.map(
      (answer) =>
        new QuestionAnswers({ ...answer, isValid: answer.isValid === "true" })
    )
  );

  return res
    .status(HttpStatus.CREATED)
    .json({ message: "question created successfully 🔥" });
});

exports.getQuestionsWithAnswersController = catchAsync(async (req, res) => {
  const status =
    req.user.type === userTypes.ADMIN ? req.query.status ?? null : null;
  const data = await getQuestionsWithAnswersService(status);

  return res.status(HttpStatus.OK).json(data);
});

exports.deleteQuestionController = catchAsync(async (req, res) => {
  await deleteQuestionService(req.params.questionId);
  return res.status(HttpStatus.NO_CONTENT).json();
});

exports.updateQuestionWithAnswersController = catchAsync(async (req, res) => {
  await updateQuestionWithAnswersService(
    req.params.questionId,
    req.body,
    req.body.answers.map(
      (answer) =>
        new QuestionAnswers({ ...answer, isValid: answer.isValid === "true" })
    )
  );

  return res
    .status(HttpStatus.OK)
    .json({ message: "question is updated successfully 🔥" });
});
