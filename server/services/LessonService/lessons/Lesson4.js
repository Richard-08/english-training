const sentenceDivider = require("../../../utils/ sentence-divider");
const { PRONOUNS } = require("../constants");

module.exports = class Lesson4 {
  constructor(LessonModel, SentencesModel) {
    this.lessonModel = LessonModel;
    this.sentencesModel = SentencesModel;
    this.dataLimit = 20;
    this.determiners = [
      "my",
      "your",
      "his",
      "her",
      "its",
      "our",
      "your",
      "their",
    ];
    this.options = PRONOUNS;
    this.type = "options";
  }

  async getLesson(id) {
    try {
      let lesson = await this.lessonModel.getLessonById(id);
      let sentences = await this.getSentencesData(id);
      let data = this.getFormattedSentences(sentences);

      return { ...lesson, type: this.type, options: this.options, data };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getSentencesData(lesson_id) {
    return this.sentencesModel.getRandomSentencesByLessonId(
      lesson_id,
      this.dataLimit
    );
  }

  getFormattedSentences(data) {
    return data.map((sentence) => {
      return sentenceDivider(sentence.text, this.determiners);
    });
  }
};
