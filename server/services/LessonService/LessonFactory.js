const Lesson1 = require("./lessons/Lesson1");
const LessonModel = require("../../data-access/Lesson");
const DictionaryModel = require("../../data-access/Dictionary");

module.exports = class LessonFactory {
  static createLesson(id) {
    let lesson = null;

    if (id === 1) {
      lesson = new Lesson1(LessonModel, DictionaryModel);
    }

    return lesson;
  }
};
