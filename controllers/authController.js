const User = require("../database/entities/user");
const catchAsync = require("../utils/catchAsync");
const {
  registerUserService,
  loginService,
} = require("../services/authService");
const HttpStatus = require("../constants/statusCodes");

exports.registerUserController = catchAsync(async (req, res) => {
  const data = await registerUserService(new User(req.body));

  return res.status(HttpStatus.CREATED).json(data);
});

exports.loginController = catchAsync(async (req, res) => {
  const data = await loginService(req.body.email, req.body.password);

  return res.status(HttpStatus.OK).json(data);
});
