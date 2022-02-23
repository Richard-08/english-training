const sentenceGenerator = require("../../../utils/sentence-generator");
module.exports = class Lesson1 {
  constructor(LessonModel, DictionaryModel) {
    this.lessonModel = LessonModel;
    this.dictionaryModel = DictionaryModel;
    this.word_category_id = "verb";
  }

  async getLesson(id) {
    try {
      let lesson = await this.lessonModel.getLessonById(id);
      let words_list = await this.getWords(this.word_category_id);
      let sentenses_data = sentenceGenerator(words_list);
      return { ...lesson, data: sentenses_data };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getWords(category_id) {
    return this.dictionaryModel.getWordsByCategory(category_id);
  }
};
