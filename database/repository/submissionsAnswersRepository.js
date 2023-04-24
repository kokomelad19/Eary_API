const databaseConnection = require("../connection");

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
}

module.exports = new SubmissionsAnswersRepository();
