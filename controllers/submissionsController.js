const catchAsync = require("../utils/catchAsync");
const HttpStatus = require("../constants/statusCodes");
const {
  submitAnswerService,
  getSubmissionsService,
  getSubmissionDetailsService,
} = require("../services/submissionsService");

exports.submitAnswerController = catchAsync(async (req, res) => {
  const submission = await submitAnswerService(req.user.id, req.body.answers);
  return res.status(HttpStatus.OK).json(submission);
});

exports.getSubmissionsController = catchAsync(async (req, res) => {
  const data = await getSubmissionsService(
    req.originalUrl.includes("/submissions/my-history")
      ? req.user.id
      : req.params.userId,
    parseInt(req.query.page ?? "1"),
    parseInt(req.query.size ?? "10")
  );
  return res.status(HttpStatus.OK).json(data);
});

exports.getSubmissionDetailsController = catchAsync(async (req, res) => {
  const submissionDetails = await getSubmissionDetailsService(
    req.params.submissionId,
    req.user
  );
  return res.status(HttpStatus.OK).json(submissionDetails);
});
