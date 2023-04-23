const catchAsync = require("../utils/catchAsync");
const { getAllUsersService } = require("../services/usersManagementService");
const HttpStatus = require("../constants/statusCodes");

exports.getAllUsersController = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page ?? "1");
  const size = parseInt(req.query.size ?? "10");

  delete req.query.page;
  delete req.query.size;

  const data = await getAllUsersService(req.query, page, size);

  return res.status(HttpStatus.OK).json(data);
});
