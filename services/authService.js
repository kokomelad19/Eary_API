const User = require("../database/entities/user");
const { catchAsync } = require("../utils/catchAsync");
const CustomError = require("../utils/customError");
const HttpStatus = require("../constants/statusCodes");
const usersRepository = require("../database/repository/usersRepository");

exports.registerUserService = catchAsync(async (user) => {
  // Check that user argument is instance of User entity
  if (!(user instanceof User)) throw new CustomError(HttpStatus.BAD_REQUEST);

  // Check if email is exist before
  await checkIsEmailExistBefore(user);

  // Encrypt password
  await user.hashPassword();

  // Insert user in database
  await usersRepository.createUser(user);

  // Generate JWT
  const token = user.generateJWT();

  // return user
  delete user.password;
  return { user, tokens: { token } };
});

const checkIsEmailExistBefore = catchAsync(async (user) => {
  const isEmailExist = await usersRepository.findByEmail(user.email);

  if (isEmailExist)
    throw new CustomError(HttpStatus.BAD_REQUEST, ["Email is already exist"]);
});
