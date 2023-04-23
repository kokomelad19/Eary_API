const User = require("../entities/user");
const databaseConnection = require("../connection");

class UsersRepository {
  async findOne(findArgs) {
    try {
      const user = await databaseConnection.runQuery(
        `SELECT * FROM users WHERE ${Object.keys(findArgs)
          .map((arg) => `${arg} = ?`)
          .join(" AND ")} LIMIT 1;`,
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

  async findAllWithPagination(findArgs, page, size) {
    try {
      const users = await databaseConnection.runQuery(
        `SELECT * FROM users ${
          findArgs
            ? "WHERE " +
              Object.keys(findArgs)
                .map((arg) => {
                  if (["phone", "email", "name"].includes(arg))
                    return `${arg} LIKE ?`;
                  return `${arg} = ?`;
                })
                .join(" AND ")
            : ""
        } LIMIT ${size ?? 10} OFFSET ${((page ?? 1) - 1) * (size ?? 10)};`,
        findArgs
          ? Object.keys(findArgs).map((key) => {
              if (["phone", "email", "name"].includes(key))
                return `%${findArgs[key]}%`;
              return findArgs[key];
            })
          : undefined
      );

      return users.map((user) => {
        delete user.password;
        return new User(user);
      });
    } catch (err) {
      throw err;
    }
  }

  async countUsers(findArgs, col = "*") {
    try {
      const users = await databaseConnection.runQuery(
        `SELECT COUNT(${col}) as usersNumber FROM users ${
          findArgs
            ? "WHERE " +
              Object.keys(findArgs)
                .map((arg) => {
                  if (["phone", "email", "name"].includes(arg))
                    return `${arg} LIKE ?`;
                  return `${arg} = ?`;
                })
                .join(" AND ")
            : ""
        };`,
        findArgs
          ? Object.keys(findArgs).map((key) => {
              if (["phone", "email", "name"].includes(key))
                return `%${findArgs[key]}%`;
              return findArgs[key];
            })
          : undefined
      );

      return users[0].usersNumber ?? 0;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UsersRepository();
