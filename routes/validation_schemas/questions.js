exports.createQuestionsWithAnswers = {
  name: {
    isString: { errorMessage: "question name is required" },
  },
  question: {
    isString: { errorMessage: "question is required" },
  },
  audio_file: {
    isURL: { errorMessage: "something went wrong" },
  },
  answers: {
    isArray: true,
  },
  "answers.*.text": {
    isString: { errorMessage: "answer text is required" },
  },
  "answers.*.priority": {
    isInt: { errorMessage: "answer priority must be unsigned number" },
  },
  "answers.*.isValid": {
    isBoolean: { errorMessage: "You must mark valid answer for each question" },
  },
};

exports.updateQuestionsWithAnswers = {
  name: {
    isString: { errorMessage: "question name is required" },
  },
  question: {
    isString: { errorMessage: "question is required" },
  },
  audio_file: {
    isURL: { errorMessage: "something went wrong" },
    optional: true,
  },
  answers: {
    isArray: true,
  },
  "answers.*.text": {
    isString: { errorMessage: "answer text is required" },
  },
  "answers.*.priority": {
    isInt: { errorMessage: "answer priority must be unsigned number" },
  },
  "answers.*.isValid": {
    isBoolean: { errorMessage: "You must mark valid answer for each question" },
  },
};
