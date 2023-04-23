const databaseConnection = require("../connection");

class QuestionsRepository {
  async createQuestion(question) {
    try {
      const createdQuestion = await databaseConnection.runQuery(
        "INSERT INTO exam_questions SET ?",
        question
      );

      question.id = createdQuestion.insertId;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new QuestionsRepository();
