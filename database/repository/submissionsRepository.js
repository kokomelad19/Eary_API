const databaseConnection = require("../connection");

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
}

module.exports = new SubmissionsRepository();
