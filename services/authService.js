const User = require("../database/entities/user");
const { catchAsync } = require("../utils/catchAsync");

exports.registerUserService = catchAsync(async (user) => {
  if (!(user instanceof User)) throw new Error("err");
});
