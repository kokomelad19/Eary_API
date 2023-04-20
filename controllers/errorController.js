const HttpStatus = require("../constants/statusCodes");

exports.errorController = (err, req, res, next) => {
  console.log("Error 🔥🔥", err);

  // TODO : Implement error handler
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err });
};
