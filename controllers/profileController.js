const User = require("../database/entities/user");
const HttpStatus = require("../constants/statusCodes");
const catchAsync = require("../utils/catchAsync");
const { updateProfileService } = require("../services/profileService");

exports.getProfileController = catchAsync(async (_req, res) => {
  delete res.locals.user.password;
  return res.status(HttpStatus.OK).json(res.locals.user);
});

exports.updateProfileController = catchAsync(async (req, res) => {
  await updateProfileService(
    res.locals.user.id,
    new User({ ...res.locals.user, ...req.body })
  );

  return res
    .status(HttpStatus.OK)
    .json({ message: "Profile updated successfully" });
});
