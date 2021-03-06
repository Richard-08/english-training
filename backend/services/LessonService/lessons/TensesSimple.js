const sentenceGenerator = require("../../../utils/sentence-generator");

module.exports = class TensesSimple {
  constructor(LessonModel, DictionaryModel) {
    this.lessonModel = LessonModel;
    this.dictionaryModel = DictionaryModel;
    this.word_category_id = "verb";
    this.words_limit = 3;
    this.type = "translate";
  }

  async getLesson(id) {
    try {
      let lesson = await this.lessonModel.getLessonById(id);
      let words_list = await this.getWords(this.word_category_id);
      let sentenses_data = sentenceGenerator(words_list).map((item) => {
        return {
          question: item.ru,
          answer: item.en,
        };
      });

      let practice = [
        {
          name: "Practice-1",
          type: this.type,
          data: sentenses_data,
        },
      ];

      return { ...lesson, practice };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getWords(category_id) {
    return this.dictionaryModel.getWordsByCategory(
      category_id,
      this.words_limit
    );
  }
};
