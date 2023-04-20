class ErrorResponse {
  constructor(statusCode, errors) {
    if (errors && !Array.isArray(errors))
      throw new Error("Invalid error messages @class ErrorResponse");

    this.status = statusCode;
    this.errors = errors
      ? errors.flat()
      : [
          "Sorry currently system is unable to perform this action, Please contact support",
        ];
  }
}

module.exports = ErrorResponse;
