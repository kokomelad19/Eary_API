const fs = require("fs");
const CustomError = require("../utils/customError");
const HttpStatus = require("../constants/statusCodes");
const Questions = require("../database/entities/questions");
const QuestionAnswers = require("../database/entities/questionAnswers");
const questionsRepository = require("../database/repository/questionsRepository");
const questionAnswersRepository = require("../database/repository/questionAnswersRepository");
const databaseConnection = require("../database/connection");
const { questionStatus } = require("../types/enums/questions");

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

const deleteAudioFile = async (question) => {
  try {
    await fs.promises.unlink(
      `${__dirname}/../${process.env.UPLOAD_FOLDER_NAME}/${
        question.audio_file.split("/").reverse()[0]
      }`
    );
  } catch (err) {
    throw err;
  }
};

const checkQuestionExistence = async (findArgs) => {
  try {
    const question = await questionsRepository.findOne(findArgs);

    if (!question)
      throw new CustomError(HttpStatus.NOT_FOUND, ["question is not exist"]);

    return question;
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
    await deleteAudioFile(question);

    // ROLLBACK transaction
    databaseConnection.rollback();

    // throw err
    throw err;
  }
};

exports.getQuestionsWithAnswersService = async () => {
  try {
    const total = await questionsRepository.countQuestionsByStatusWithAnswers(
      questionStatus.ACTIVE,
      "exam_questions.id"
    );
    const questions = await questionsRepository.getQuestionsByStatusWithAnswers(
      questionStatus.ACTIVE
    );

    return { total, questions };
  } catch (err) {
    throw err;
  }
};

exports.deleteQuestionService = async (questionId) => {
  await databaseConnection.beginTransaction();
  try {
    const question = await checkQuestionExistence({ id: questionId });

    await Promise.all([
      questionsRepository.updateQuestion(
        { id: questionId },
        new Questions({ ...question, status: questionStatus.INACTIVE })
      ),
      questionAnswersRepository.deleteAnswer({ questionId }),
    ]);

    await databaseConnection.commit();
  } catch (err) {
    await databaseConnection.rollback();
    throw err;
  }
};

exports.updateQuestionWithAnswersService = async (
  questionId,
  newQuestion,
  answers
) => {
  // START Transaction
  await databaseConnection.beginTransaction();
  try {
    // Validate answers
    validateAnswers(answers);

    // Validate Question Existence
    const question = await checkQuestionExistence({
      id: questionId,
      status: questionStatus.ACTIVE,
    });

    // if new audio file is sent then delete old file
    if (newQuestion.audio_file) {
      await deleteAudioFile(question);
    }

    // Create Question
    await questionsRepository.updateQuestion(
      { id: questionId },
      new Questions({ ...question, ...newQuestion })
    );

    // Delete All Answers
    await questionAnswersRepository.deleteAnswer({ questionId });

    // Create Related Answers
    await questionAnswersRepository.insertAnswers(question.id, answers);

    // COMMIT Transaction
    await databaseConnection.commit();
  } catch (err) {
    // Delete Uploaded File
    if (newQuestion.audio_file) await deleteAudioFile(newQuestion);

    // ROLLBACK transaction
    databaseConnection.rollback();

    // throw err
    throw err;
  }
};
