const sentenceDivider = require("../../../utils/sentence-divider");

module.exports = class Articles {
  constructor(LessonModel, SentencesModel) {
    this.lessonModel = LessonModel;
    this.sentencesModel = SentencesModel;
    this.dataLimit = 20; // GET FROM LESSON STATS ????????????????????????????????
    this.articles = ["a", "an", "the", "some", "x"];
    this.type = "options";
  }

  async getLesson(id) {
    try {
      let lesson = await this.lessonModel.getLessonById(id);
      let sentences = await this.getSentencesData(id);
      let data = this.getFormattedSentences(sentences);

      let practice = [
        {
          name: "Practice-1",
          type: this.type,
          options: [this.articles],
          data,
        },
      ];

      return { ...lesson, practice };
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
