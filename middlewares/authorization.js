const HttpStatus = require("../constants/statusCodes");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../database/entities/user");
const usersRepository = require("../database/repository/usersRepository");

const sendAuthroizationError = (res) => {
  return res
    .status(HttpStatus.UNAUTHORIZED)
    .json(new ErrorResponse(HttpStatus.UNAUTHORIZED, ["unauthorized"]));
};

const authorizationMiddleware = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return sendAuthroizationError(res);
    }

    const token = req.headers.authorization.split("Bearer ")[1].trim();
    let user = new User({}).decodeToken(token);

    user = await usersRepository.findOne({ id: user.id });
    if (!user) return sendAuthroizationError(res);

    res.locals.user = user;
    return next();
  } catch (err) {
    return sendAuthroizationError(res);
  }
};

module.exports = authorizationMiddleware;
