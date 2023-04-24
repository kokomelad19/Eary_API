const databaseConnection = require("../connection");
const SubmissionsAnswers = require("../entities/submissionsAnswers");

class SubmissionsAnswersRepository {
  async insertAnswers(submissionId, answers) {
    try {
      const promises = [];

      for (const answer of answers) {
        promises.push(
          databaseConnection.runQuery(
            "INSERT INTO submissions_questions_answers SET ?",
            {
              ...answer,
              submissionId,
            }
          )
        );
      }

      return await Promise.all(promises);
    } catch (err) {
      throw err;
    }
  }

  async findBySubmissionId(submissionId) {
    try {
      const answers = await databaseConnection.runQuery(
        `SELECT * FROM submissions_questions_answers WHERE submissionId = ?`,
        [submissionId]
      );

      return answers.map((answer) => new SubmissionsAnswers(answer));
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new SubmissionsAnswersRepository();
