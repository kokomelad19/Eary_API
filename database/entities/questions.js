const { questionStatus } = require("../../types/enums/questions");

class Questions {
  constructor({ name, question, audio_file, status, id, answers }) {
    this.name = name ?? undefined;
    this.question = question ?? undefined;
    this.audio_file = audio_file ?? undefined;
    this.status = status ?? questionStatus.ACTIVE;
    this.id = id ?? undefined;
  }
}

module.exports = Questions;
