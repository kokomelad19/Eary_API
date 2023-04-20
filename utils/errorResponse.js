class ErrorResponse {
  constructor(statusCode, errors) {
    this.status = statusCode;
    this.errors = errors.flat();
  }
}

module.exports = ErrorResponse;
