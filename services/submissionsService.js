const SubmissionsAnswers = require("../database/entities/submissionsAnswers");
const Submissions = require("../database/entities/submissions");
const databaseConnection = require("../database/connection");
const submissionsRepository = require("../database/repository/submissionsRepository");
const submissionsAnswersRepository = require("../database/repository/submissionsAnswersRepository");
const questionsRepository = require("../database/repository/questionsRepository");

exports.submitAnswerService = async (userId, answers) => {
  await databaseConnection.beginTransaction();
  try {
    if (!Array.isArray(answers)) {
      throw new CustomError(HttpStatus.BAD_REQUEST);
    }

    // Construct Submission Object
    const submission = new Submissions({ userId, answers });

    // Save Submission as historical data
    await submissionsRepository.createSubmission(submission);

    // construct answers as app entity
    answers = await Promise.all(
      answers.map(async (answer) => {
        // Get Question data
        const question = await questionsRepository.findOne({
          id: answer.submittedAnswer.questionId,
        });
        if (question)
          return new SubmissionsAnswers({
            questionText: question.question,
            questionAudioFile: question.audio_file,
            answerText: answer.submittedAnswer.text,
            isValidAnswer: answer.submittedAnswer.isValid,
            submissionId: submission.id,
          });
      })
    );

    // Save submission answers
    await submissionsAnswersRepository.insertAnswers(answers);

    await databaseConnection.commit();

    return submission;
  } catch (err) {
    await databaseConnection.rollback();
    throw err;
  }
};
