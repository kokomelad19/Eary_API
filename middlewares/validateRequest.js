const { checkSchema } = require("express-validator");
const HttpStatus = require("../constants/statusCodes");
const ErrorResponse = require("../utils/errorResponse");

const validateRequest =
  (schema, target = "body") =>
  async (req, res, next) => {
    try {
      const result = await checkSchema(schema, [target], { strict: true }).run(
        req
      );

      Object.keys(req[target]).map((key) => {
        if (!Object.keys(schema).includes(key)) throw new Error();
      });

      if (result.length > 0 && result.some((res) => res.errors.length > 0)) {
        return res.status(HttpStatus.BAD_REQUEST).json(
          new ErrorResponse(
            HttpStatus.BAD_REQUEST,
            result.map((res) => res.errors.map((err) => err.msg))
          )
        );
      }

      return next();
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  };

module.exports = validateRequest;
