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

  async deleteAnswer(findArgs) {
    try {
      await databaseConnection.runQuery(
        `DELETE FROM question_answers WHERE ${Object.keys(findArgs)
          .map((arg) => `${arg} = ?`)
          .join(" AND ")};`,
        Object.values(findArgs)
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new QuestionAnswersRepository();
