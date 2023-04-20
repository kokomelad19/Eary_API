const HttpStatus = require("../constants/statusCodes");
const ErrorResponse = require("../utils/errorResponse");

exports.notFoundRouterController = (req, res) => {
  return res
    .status(HttpStatus.NOT_FOUND)
    .json(new ErrorResponse(HttpStatus.NOT_FOUND, ["API Not Found"]));
};
