class ErrorResponse {
  constructor(statusCode, errors) {
    if (!Array.isArray(errors))
      throw new Error("Invalid error messages @class ErrorResponse");

    this.status = statusCode;
    this.errors = errors.flat();
  }
}

module.exports = ErrorResponse;
