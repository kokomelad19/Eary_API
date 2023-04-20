const databaseConnection = require("../connection");

class UsersRepository {
  async findByEmail(email) {
    try {
      const user = await databaseConnection.runQuery(
        `SELECT * FROM users WHERE email = '${email}'`
      );

      return user[0];
    } catch (err) {
      throw err;
    }
  }

  async createUser(user) {
    try {
      await databaseConnection.runQuery("INSERT INTO users SET ?", user);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UsersRepository();