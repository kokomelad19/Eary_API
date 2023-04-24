const SubmissionsAnswers = require("../database/entities/submissionsAnswers");
const Submissions = require("../database/entities/submissions");
const CustomError = require("../utils/customError");
const HttpStatus = require("../constants/statusCodes");
const databaseConnection = require("../database/connection");
const submissionsRepository = require("../database/repository/submissionsRepository");
const submissionsAnswersRepository = require("../database/repository/submissionsAnswersRepository");
const questionsRepository = require("../database/repository/questionsRepository");
const { questionStatus } = require("../types/enums/questions");
const { userTypes } = require("../types/enums/users");

const checkSubmissionExistence = async (submissionId, user) => {
  const isSubmissionExist = await submissionsRepository.findOne({
    id: submissionId,
    ...(user.type === userTypes.USER ? { userId: user.id } : {}),
  });
  if (!isSubmissionExist)
    throw new CustomError(HttpStatus.NOT_FOUND, ["submission is not exist"]);
};

exports.submitAnswerService = async (userId, answers) => {
  await databaseConnection.beginTransaction();
  try {
    if (!Array.isArray(answers)) {
      throw new CustomError(HttpStatus.BAD_REQUEST);
    }

    // construct answers as app entity
    answers = (
      await Promise.all(
        answers.map(async (answer) => {
          // Get Question data
          const question = await questionsRepository.findOne({
            id: answer.submittedAnswer.questionId,
            status: questionStatus.ACTIVE,
          });
          if (question)
            return new SubmissionsAnswers({
              questionText: question.question,
              questionAudioFile: question.audio_file,
              answerText: answer.submittedAnswer.text,
              isValidAnswer: answer.submittedAnswer.isValid,
            });
        })
      )
    ).filter((q) => q !== undefined);

    // Construct Submission Object
    const submission = Submissions.createFromUserRequest({ userId, answers });

    // Save Submission as historical data
    await submissionsRepository.createSubmission(submission);

    // Save submission answers
    await submissionsAnswersRepository.insertAnswers(submission.id, answers);

    await databaseConnection.commit();

    return submission;
  } catch (err) {
    await databaseConnection.rollback();
    throw err;
  }
};

exports.getSubmissionsService = async (userId, page, size) => {
  try {
    const total = await submissionsRepository.count(userId, "id");
    const submissions = await submissionsRepository.findAllWithPagination(
      userId,
      page,
      size
    );

    return { total, submissions };
  } catch (err) {
    throw err;
  }
};

exports.getSubmissionDetailsService = async (submissionId, user) => {
  try {
    await checkSubmissionExistence(submissionId, user);

    return await submissionsAnswersRepository.findBySubmissionId(submissionId);
  } catch (err) {
    throw err;
  }
};
