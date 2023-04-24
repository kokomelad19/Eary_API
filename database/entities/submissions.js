class Submissions {
  constructor({
    userId,
    allExamQuestionsNumber,
    correctQuestionsNumber,
    submittedAt,
    id,
  }) {
    this.userId = userId;
    this.submittedAt = submittedAt;
    this.allExamQuestionsNumber = allExamQuestionsNumber;
    this.correctQuestionsNumber = correctQuestionsNumber;
    this.id = id;
  }

  static createFromUserRequest({ userId, answers, submittedAt, id }) {
    return new this({
      userId: userId ?? null,
      allExamQuestionsNumber: answers.length ?? 0,
      correctQuestionsNumber:
        answers.filter((ans) => ans.isValidAnswer === 1).length ?? 0,
      id: id ?? null,
      submittedAt: submittedAt ?? new Date().toISOString(),
    });
  }

  static createFromQueryResult({
    userId,
    allExamQuestionsNumber,
    correctQuestionsNumber,
    submittedAt,
    id,
  }) {
    return new this({
      userId,
      allExamQuestionsNumber,
      correctQuestionsNumber,
      submittedAt,
      id,
    });
  }
}

module.exports = Submissions;
