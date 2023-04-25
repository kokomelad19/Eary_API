const { checkSchema } = require("express-validator");
const HttpStatus = require("../constants/statusCodes");
const ErrorResponse = require("../utils/errorResponse");
const { deleteAudioFile } = require("../services/questionsService");

const validateRequest =
  (schema, target = "body") =>
  async (req, res, next) => {
    try {
      const result = await checkSchema(schema, [target], { strict: true }).run(
        req
      );

      Object.keys(req[target]).map((key) => {
        if (!Object.keys(schema).includes(key))
          throw new Error("invalid schema");
      });

      if (result.length > 0 && result.some((res) => res.errors.length > 0)) {
        if (req.file) {
          await deleteAudioFile(req.body);
        }
        return res.status(HttpStatus.BAD_REQUEST).json(
          new ErrorResponse(
            HttpStatus.BAD_REQUEST,
            result.map((res) => res.errors.map((err) => err.msg))
          )
        );
      }

      return next();
    } catch (err) {
      if (req.file) {
        await deleteAudioFile(req.body);
      }

      console.log("Validation Error ", err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR));
    }
  };

module.exports = validateRequest;
