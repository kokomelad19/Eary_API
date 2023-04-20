const HttpStatus = require("../constants/statusCodes");
const ErrorResponse = require("../utils/errorResponse");
const CustomError = require("../utils/customError");

exports.errorController = (err, req, res, next) => {
  console.log("Error 🔥🔥", err);

  // if custom error then return
  if (err.name === CustomError.name && err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json(new ErrorResponse(err.statusCode, err.errorMessage));
  }

  // TODO : Implement error handler
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
};
