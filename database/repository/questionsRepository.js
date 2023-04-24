const databaseConnection = require("../connection");
const HelperRepository = require("./helperRepository");

class QuestionsRepository extends HelperRepository {
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

  async getQuestionsByStatusWithAnswers(status) {
    try {
      const questionsWithAnswers = await databaseConnection.runQuery({
        sql: `SELECT * FROM exam_questions INNER JOIN question_answers ON exam_questions.id = question_answers.questionId ${
          status ? "WHERE status = ?" : ""
        };`,
        values: [status],
        nestTables: true,
      });

      return this.selectManyMergeJoinedTables({
        results: questionsWithAnswers,
        parentTableName: "exam_questions",
        childTableName: "question_answers",
        childTableNickname: "answers",
        primaryKeyName: "id",
        foreignKeyName: "questionId",
      });
    } catch (err) {
      throw err;
    }
  }

  async countQuestionsByStatusWithAnswers(status, col = "*") {
    try {
      const questionsCount = await databaseConnection.runQuery(
        `SELECT COUNT(DISTINCT ${col}) as count FROM exam_questions INNER JOIN question_answers ON exam_questions.id = question_answers.questionId ${
          status ? "WHERE status = ?" : ""
        }`,
        [status]
      );

      return questionsCount[0].count ?? 0;
    } catch (err) {
      throw err;
    }
  }

  async deleteQuestionById(questionId) {
    try {
      await databaseConnection.runQuery(
        "DELETE FROM exam_questions WHERE id = ?",
        [questionId]
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new QuestionsRepository();
