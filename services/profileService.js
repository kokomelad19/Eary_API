const User = require("../database/entities/user");
const usersRepository = require("../database/repository/usersRepository");

exports.updateProfileService = async (
  userId,
  newUser,
  isNewPassword = false
) => {
  try {
    // Check that user argument is instance of User entity
    if (!(newUser instanceof User))
      throw new CustomError(HttpStatus.BAD_REQUEST);

    if (isNewPassword) await newUser.hashPassword();

    await usersRepository.updateUser({ id: userId }, newUser);
  } catch (err) {
    throw err;
  }
};
