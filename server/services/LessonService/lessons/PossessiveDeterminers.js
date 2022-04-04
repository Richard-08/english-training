const sentenceDivider = require("../../../utils/sentence-divider");
const { PRONOUNS } = require("../constants");

module.exports = class PossessiveDeterminers {
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

      let practice = [
        {
          name: "Practice-1",
          type: this.type,
          options: this.options,
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
      return sentenceDivider(sentence.text, this.determiners);
    });
  }
};
