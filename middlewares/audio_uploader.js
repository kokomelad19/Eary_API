const multer = require("multer");
const path = require("path");
const CustomError = require("../utils/customError");
const HttpStatus = require("../constants/statusCodes");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, `${process.env.UPLOAD_FOLDER_NAME}/`);
  },
  filename: (req, file, cb) => {
    const filePathName = Date.now() + path.extname(file.originalname);
    req.body.audio_file = `http://${req.hostname}:${process.env.PORT}/${filePathName}`;
    cb(null, filePathName);
  },
});

exports.uploadAudioFileMiddleware = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("audio")) return cb(null, true);
    cb(
      new CustomError(HttpStatus.BAD_REQUEST, ["only audio files are accepted"])
    );
  },
});

exports.validateAudioFileExistence = (req, res, next) => {
  try {
    if (!req.file) {
      new CustomError(HttpStatus.BAD_REQUEST, ["audio file must be sent"]);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};
