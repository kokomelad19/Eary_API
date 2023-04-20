class CustomError {
  static name = "customError";

  constructor(statusCode, errorMessage) {
    if (errorMessage && !Array.isArray(errorMessage))
      throw new Error("Invalid error messages @class CustomError");

    this.name = CustomError.name;
    this.code = CustomError.name;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage ?? [
      "Sorry currently system is unable to perform this action, Please contact support",
    ];
  }
}

module.exports = CustomError;
