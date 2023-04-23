const HttpStatus = require("../constants/statusCodes");
const ErrorResponse = require("../utils/errorResponse");

exports.sendForbiddenError = (res) => {
  return res
    .status(HttpStatus.FORBIDDEN)
    .json(new ErrorResponse(HttpStatus.FORBIDDEN, ["forbidden"]));
};
