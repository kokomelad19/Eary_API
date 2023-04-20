const { checkSchema } = require("express-validator");
const HttpStatus = require("../constants/statusCodes");
const ErrorResponse = require("../utils/errorResponse");

exports.validateRequest = (schema, target) => async (req, res, next) => {
  const result = await checkSchema(schema, [target]).run(req);

  if (result.length > 0 && result.some((res) => res.errors.length > 0)) {
    return res.status(HttpStatus.BAD_REQUEST).json(
      new ErrorResponse(
        HttpStatus.BAD_REQUEST,
        result.map((res) => res.errors.map((err) => err.msg))
      )
    );
  }

  return next();
};
