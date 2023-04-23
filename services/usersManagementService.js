const usersRepository = require("../database/repository/usersRepository");
const { userTypes } = require("../types/enums/users");

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
