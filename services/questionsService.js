const fs = require("fs");
const CustomError = require("../utils/customError");
const HttpStatus = require("../constants/statusCodes");
const Questions = require("../database/entities/questions");
const QuestionAnswers = require("../database/entities/questionAnswers");
const questionsRepository = require("../database/repository/questionsRepository");
const questionAnswersRepository = require("../database/repository/questionAnswersRepository");
const databaseConnection = require("../database/connection");

const validateAnswers = (answers) => {
  try {
    const isValidAnswerSent = answers.filter(
      (answer) => answer.isValid === true
    );
    if (isValidAnswerSent.length !== 1) {
      throw new CustomError(HttpStatus.BAD_REQUEST, [
        "Must send only one valid answer",
      ]);
    }
  } catch (err) {
    throw err;
  }
};

exports.createQuestionWithAnswersService = async (question, answers) => {
  // START Transaction
  await databaseConnection.beginTransaction();
  try {
    if (
      !(question instanceof Questions) ||
      !(
        Array.isArray(answers) &&
        answers.every((answer) => answer instanceof QuestionAnswers)
      )
    ) {
      throw new CustomError(HttpStatus.BAD_REQUEST);
    }

    // Validate answers
    validateAnswers(answers);

    // Create Question
    await questionsRepository.createQuestion(question);

    // Create Related Answers
    await questionAnswersRepository.insertAnswers(question.id, answers);

    // COMMIT Transaction
    await databaseConnection.commit();
  } catch (err) {
    // Delete Uploaded File
    await fs.promises.unlink(
      `${__dirname}/../upload/${question.audio_file.split("/").reverse()[0]}`
    );

    // ROLLBACK transaction
    databaseConnection.rollback();

    // throw err
    throw err;
  }
};
