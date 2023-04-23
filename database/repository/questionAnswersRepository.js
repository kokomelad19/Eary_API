const databaseConnection = require("../connection");

class QuestionAnswersRepository {
  async insertAnswers(questionId, answers) {
    try {
      const promises = [];

      for (const answer of answers) {
        promises.push(
          databaseConnection.runQuery("INSERT INTO question_answers SET ?", {
            ...answer,
            questionId,
          })
        );
      }

      return await Promise.all(promises);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new QuestionAnswersRepository();
