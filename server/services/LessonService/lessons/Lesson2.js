const sentenceDivider = require("../../../utils/ sentence-divider");

module.exports = class Lesson2 {
  constructor(LessonModel, SentencesModel) {
    this.lessonModel = LessonModel;
    this.sentencesModel = SentencesModel;
    this.dataLimit = 20;
    this.articles = ["a", "an", "the", "some", "x"];
  }

  async getLesson(id) {
    try {
      let lesson = await this.lessonModel.getLessonById(id);
      let sentences = await this.getSentencesData(id);
      let data = this.getFormattedSentences(sentences);

      return { ...lesson, options: this.articles, data };
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
      return sentenceDivider(sentence.text, this.articles);
    });
  }
};
