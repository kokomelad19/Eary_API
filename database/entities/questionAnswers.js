class QuestionAnswers {
  constructor({ text, priority, isValid, questionId, id }) {
    this.text = text ?? undefined;
    this.priority = priority ?? undefined;
    this.isValid = isValid ?? undefined;
    this.questionId = questionId ?? undefined;
    this.id = id ?? undefined;
  }
}

module.exports = QuestionAnswers;
