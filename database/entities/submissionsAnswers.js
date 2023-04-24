class SubmissionsAnswers {
  constructor({
    questionText,
    questionAudioFile,
    answerText,
    isValidAnswer,
    submissionId,
    id,
  }) {
    this.questionText = questionText ?? null;
    this.questionAudioFile = questionAudioFile ?? null;
    this.answerText = answerText ?? null;
    this.isValidAnswer = isValidAnswer ?? null;
    this.submissionId = submissionId ?? null;
    this.id = id ?? null;
  }
}

module.exports = SubmissionsAnswers;
