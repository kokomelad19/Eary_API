const User = require("../database/entities/user");
const CustomError = require("../utils/customError");
const HttpStatus = require("../constants/statusCodes");
const usersRepository = require("../database/repository/usersRepository");

exports.registerUserService = async (user) => {
  try {
    // Check that user argument is instance of User entity
    if (!(user instanceof User)) throw new CustomError(HttpStatus.BAD_REQUEST);

    // Encrypt password
    await user.hashPassword();

    // Insert user in database
    await usersRepository.createUser(user);

    // Generate JWT
    const token = user.generateJWT();

    // return user
    delete user.password;
    return { user, tokens: { token } };
  } catch (err) {
    throw err;
  }
};
