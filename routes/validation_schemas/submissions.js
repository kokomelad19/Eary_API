exports.submitAnswerSchema = {
  answers: {
    isArray: true,
  },
  "answers.*.questionId": {
    isInt: { errorMessage: "Invalid question id" },
    toInt: true,
  },
  "answers.*.submittedAnswer": {
    isObject: true,
    errorMessage: "Answer must be an object",
  },
  "answers.*.submittedAnswer.text": {
    isString: true,
    errorMessage: "Answer text must be a string",
  },
  "answers.*.submittedAnswer.isValid": {
    isInt: true,
    toInt: true,
    isIn: {
      options: [[0, 1]],
      errorMessage: "Answer validity must be either 0 or 1",
    },
    errorMessage: "Answer validity must be an integer",
  },
};
