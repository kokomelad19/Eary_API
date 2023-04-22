const HttpStatus = require("../constants/statusCodes");
const ErrorResponse = require("../utils/errorResponse");
const CustomError = require("../utils/customError");

exports.errorController = (err, req, res, next) => {
  console.log("Error  ", err);

  let errResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR);

  // if custom error then return
  if (err.name === CustomError.name && err instanceof CustomError) {
    errResponse = new ErrorResponse(err.statusCode, err.errorMessage);
  } else if ("sql" in err) {
    switch (err.code) {
      case "ER_DUP_ENTRY":
        errResponse = handleUniqueViolation(err);
        break;
    }
  }

  // TODO : Implement error handler
  return res.status(errResponse.status).json(errResponse);
};

const handleUniqueViolation = (err) => {
  const key = err.sqlMessage
    .split("for key")
    .reverse()[0]
    .split(".")
    .reverse()[0]
    .trim()
    .replace(/'/g, "");

  return new ErrorResponse(HttpStatus.BAD_REQUEST, [`${key} is already exist`]);
};
