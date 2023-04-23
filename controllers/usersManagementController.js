const catchAsync = require("../utils/catchAsync");
const {
  getAllUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
  getUserByIdService,
} = require("../services/usersManagementService");
const HttpStatus = require("../constants/statusCodes");
const User = require("../database/entities/user");

exports.getAllUsersController = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page ?? "1");
  const size = parseInt(req.query.size ?? "10");

  delete req.query.page;
  delete req.query.size;

  const data = await getAllUsersService(req.query, page, size);

  return res.status(HttpStatus.OK).json(data);
});

exports.createUserController = catchAsync(async (req, res) => {
  const user = await createUserService(new User(req.body));

  return res.status(HttpStatus.CREATED).json(user);
});

exports.updateUserController = catchAsync(async (req, res) => {
  await updateUserService(req.params.userId, req.body);

  return res
    .status(HttpStatus.OK)
    .json({ message: "User data is updated successfully 🔥" });
});

exports.deleteUserController = catchAsync(async (req, res) => {
  await deleteUserService(req.params.userId);
  return res.status(HttpStatus.NO_CONTENT).json();
});

exports.getUserByIdController = catchAsync(async (req, res) => {
  const user = await getUserByIdService(req.params.userId);
  return res.status(HttpStatus.OK).json(user);
});
