const HttpStatus = require("../constants/statusCodes");
const CustomError = require("../utils/customError");
const User = require("../database/entities/user");
const userRepository = require("../database/repository/usersRepository");

const sendError = (res) => {
  return res
    .status(HttpStatus.UNAUTHORIZED)
    .json(new CustomError(HttpStatus.UNAUTHORIZED, ["unauthorized"]));
};

const authenticate = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers?.authorization.startsWith("Bearer ")
    )
      return sendError(err);

    const token = req.headers.authorization.split("Bearer ")[1];
    const decodedUser = new User().decodeToken(token);

    const user = await userRepository.findByid(decodedUser.id);
    if (!user) return sendError(err);

    req.headers.user = user;
  } catch (err) {
    return sendError(res);
  }
};

module.exports = authenticate;
