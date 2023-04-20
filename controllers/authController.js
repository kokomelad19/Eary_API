const User = require("../database/entities/user");
const { registerUserService } = require("../services/authService");
const { catchAsync } = require("../utils/catchAsync");
const HttpStatus = require("../constants/statusCodes");

exports.registerUser = catchAsync(async (req, res, next) => {
  const data = await registerUserService(
    new User(req.body.name, req.body.email, req.body.password, req.body.phone)
  );

  return res.status(HttpStatus.CREATED).json(data);
});
