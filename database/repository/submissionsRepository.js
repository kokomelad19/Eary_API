const databaseConnection = require("../connection");
const Submissions = require("../entities/submissions");

class SubmissionsRepository {
  async createSubmission(submission) {
    try {
      const insertedSubmission = await databaseConnection.runQuery(
        `INSERT INTO user_submissions_history SET ?`,
        submission
      );

      submission.id = insertedSubmission.insertId;
    } catch (err) {
      throw err;
    }
  }

  async findAllWithPagination(userId, page = 1, size = 10) {
    try {
      const submissions = await databaseConnection.runQuery(
        `SELECT * FROM user_submissions_history ${
          userId ? "WHERE userId = ?" : ""
        } ORDER BY submittedAt DESC LIMIT ${size} OFFSET ${(page - 1) * size};`,
        userId ? [userId] : undefined
      );

      return submissions.map((submission) => {
        return Submissions.createFromQueryResult(submission);
      });
    } catch (err) {
      throw err;
    }
  }

  async count(userId, col = "*") {
    try {
      const submission = await databaseConnection.runQuery(
        `SELECT COUNT(${col}) as count FROM user_submissions_history ${
          userId ? "WHERE userId = ?" : ""
        }`,
        userId ? [userId] : undefined
      );

      return submission[0].count ?? 0;
    } catch (err) {
      throw err;
    }
  }

  async findOne(findArgs) {
    try {
      const submission = await databaseConnection.runQuery(
        `SELECT * FROM user_submissions_history WHERE ${Object.keys(findArgs)
          .map((arg) => `${arg} = ?`)
          .join(" AND ")} LIMIT 1;`,
        Object.values(findArgs)
      );
      return submission[0]
        ? Submissions.createFromQueryResult(submission[0])
        : null;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new SubmissionsRepository();
