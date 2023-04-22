const User = require("../database/entities/user");
const usersRepository = require("../database/repository/usersRepository");

exports.updateProfileService = async (userId, newUser) => {
  try {
    // Check that user argument is instance of User entity
    if (!(newUser instanceof User))
      throw new CustomError(HttpStatus.BAD_REQUEST);

    await usersRepository.updateUser({ id: userId }, newUser);
  } catch (err) {
    throw err;
  }
};
