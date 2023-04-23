const User = require("../database/entities/user");
const CustomError = require("../utils/customError");
const HttpStatus = require("../constants/statusCodes");
const usersRepository = require("../database/repository/usersRepository");
const databaseConnection = require("../database/connection");

exports.registerUserService = async (user) => {
  await databaseConnection.beginTransaction();
  try {
    // Check that user argument is instance of User entity
    if (!(user instanceof User)) throw new CustomError(HttpStatus.BAD_REQUEST);

    // Encrypt password
    await user.hashPassword();

    // Insert user in database
    await usersRepository.createUser(user);

    // Generate JWT
    const token = user.generateToken();

    await databaseConnection.commit();
    // return user
    delete user.password;
    return { user, tokens: { token } };
  } catch (err) {
    await databaseConnection.rollback();
    throw err;
  }
};

exports.loginService = async (email, password) => {
  try {
    // Check Email existence
    const user = await usersRepository.findOne({
      email: email.toLowerCase().trim(),
    });
    if (!user) {
      throw new CustomError(HttpStatus.BAD_REQUEST, [
        "invalid email or password",
      ]);
    }

    // Check Email correctness
    if (!(await user.comparePasswords(password))) {
      throw new CustomError(HttpStatus.BAD_REQUEST, [
        "invalid email or password",
      ]);
    }

    // Generate JWT Tokens
    const token = user.generateToken();

    // return user
    delete user.password;
    return { user, tokens: { token } };
  } catch (err) {
    throw err;
  }
};
