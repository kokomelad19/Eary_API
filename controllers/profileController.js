const User = require("../database/entities/user");
const HttpStatus = require("../constants/statusCodes");
const catchAsync = require("../utils/catchAsync");
const { updateProfileService } = require("../services/profileService");

exports.getProfileController = catchAsync(async (req, res) => {
  delete req.user.password;
  return res.status(HttpStatus.OK).json(req.user);
});

exports.updateProfileController = catchAsync(async (req, res) => {
  const isNewPassword = req.body.password ? true : false;

  await updateProfileService(
    req.user.id,
    new User({ ...req.user, ...req.body }),
    isNewPassword
  );

  return res
    .status(HttpStatus.OK)
    .json({ message: "Profile updated successfully" });
});
