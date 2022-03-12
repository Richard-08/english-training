const Lesson1 = require("./lessons/Lesson1");
const Lesson2 = require("./lessons/Lesson2");
const Lesson3 = require("./lessons/Lesson3");
const LessonModel = require("../../data-access/Lesson");
const DictionaryModel = require("../../data-access/Dictionary");
const SentencesModel = require("../../data-access/Sentences");

module.exports = class LessonFactory {
  static createLesson(id) {
    let lesson = null;

    if (id === 1) {
      lesson = new Lesson1(LessonModel, DictionaryModel);
    } else if (id === 2) {
      lesson = new Lesson2(LessonModel, SentencesModel);
    } else if (id === 3) {
      lesson = new Lesson3(LessonModel, SentencesModel);
    }

    return lesson;
  }
};
