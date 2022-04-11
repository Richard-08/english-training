const TensesSimple = require("./lessons/TensesSimple");
const Articles = require("./lessons/Articles");
const DemoDeterminers = require("./lessons/DemoDeterminers");
const PossessiveDeterminers = require("./lessons/PossessiveDeterminers");
const LessonModel = require("../../data-access/Lesson");
const DictionaryModel = require("../../data-access/Dictionary");
const SentencesModel = require("../../data-access/Sentences");

module.exports = class LessonFactory {
  static createLesson(id) {
    let lesson = null;

    if (id === 1) {
      lesson = new TensesSimple(LessonModel, DictionaryModel);
    } else if (id === 2) {
      lesson = new Articles(LessonModel, SentencesModel);
    } else if (id === 3) {
      lesson = new DemoDeterminers(LessonModel, SentencesModel);
    } else if (id === 4) {
      lesson = new PossessiveDeterminers(LessonModel, SentencesModel);
    }

    return lesson;
  }
};
