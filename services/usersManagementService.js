const User = require("../database/entities/user");
const usersRepository = require("../database/repository/usersRepository");
const CustomError = require("../utils/customError");
const { userTypes } = require("../types/enums/users");
const HttpStatus = require("../constants/statusCodes");
const databaseConnection = require("../database/connection");

exports.getAllUsersService = async (findArgs, page, size) => {
  try {
    const total = await usersRepository.countUsers(
      { ...findArgs, type: userTypes.USER },
      "id"
    );
    const users = await usersRepository.findAllWithPagination(
      { ...findArgs, type: userTypes.USER },
      page,
      size
    );

    return { total, users };
  } catch (err) {
    throw err;
  }
};

exports.createUserService = async (user) => {
  await databaseConnection.beginTransaction();
  try {
    // Check that user argument is instance of User entity
    if (!(user instanceof User)) throw new CustomError(HttpStatus.BAD_REQUEST);

    // Encrypt password
    await user.hashPassword();

    // Insert user in database
    await usersRepository.createUser(user);

    await databaseConnection.commit();
    // return user
    delete user.password;
    return user;
  } catch (err) {
    await databaseConnection.rollback();
    throw err;
  }
};

exports.updateUserService = async (userId, newUser) => {
  try {
    const user = await this.getUserByIdService(userId);

    await usersRepository.updateUser(
      { id: userId },
      new User({ ...user, ...newUser })
    );
  } catch (err) {
    throw err;
  }
};

exports.deleteUserService = async (userId) => {
  try {
    await usersRepository.deleteUser(userId);
  } catch (err) {
    throw err;
  }
};

exports.getUserByIdService = async (userId) => {
  try {
    const user = await usersRepository.findOne({
      id: userId,
      type: userTypes.USER,
    });
    if (!user)
      throw new CustomError(HttpStatus.NOT_FOUND, ["user is not exist"]);

    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
};
