class Submissions {
  constructor({ userId, answers, submittedAt, id }) {
    this.userId = userId ?? null;
    this.submittedAt = submittedAt ?? new Date().toISOString();
    this.allExamQuestionsNumber = answers.length ?? 0;
    this.correctQuestionsNumber =
      answers.filter((ans) => ans.submittedAnswer.isValid === 1).length ?? 0;
    this.id = id ?? null;
  }
}

module.exports = Submissions;
