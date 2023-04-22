const User = require("../entities/user");
const databaseConnection = require("../connection");

class UsersRepository {
  async findOne(findArgs) {
    try {
      const user = await databaseConnection.runQuery(
        `SELECT * FROM users WHERE ${Object.keys(findArgs)
          .map((arg) => `${arg} = ?`)
          .join(" AND ")}`,
        Object.values(findArgs)
      );
      return user[0] ? new User(user[0]) : null;
    } catch (err) {
      throw err;
    }
  }

  async createUser(user) {
    try {
      const createdUser = await databaseConnection.runQuery(
        "INSERT INTO users SET ?",
        user
      );

      user.id = createdUser.insertId;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(findArgs, newUser) {
    try {
      await databaseConnection.runQuery(
        `UPDATE users SET ? WHERE ${Object.keys(findArgs)
          .map((arg) => `${arg} = ?`)
          .join(" AND ")}`,
        [newUser, ...Object.values(findArgs)]
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UsersRepository();
