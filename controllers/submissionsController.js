const catchAsync = require("../utils/catchAsync");
const HttpStatus = require("../constants/statusCodes");
const { submitAnswerService } = require("../services/submissionsService");

exports.submitAnswerController = catchAsync(async (req, res) => {
  const submission = await submitAnswerService(req.user.id, req.body.answers);
  return res.status(HttpStatus.OK).json(submission);
});
