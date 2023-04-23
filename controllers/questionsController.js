const catchAsync = require("../utils/catchAsync");
const {
  createQuestionWithAnswersService,
} = require("../services/questionsService");
const Questions = require("../database/entities/questions");
const QuestionAnswers = require("../database/entities/questionAnswers");
const HttpStatus = require("../constants/statusCodes");

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
