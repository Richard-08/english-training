const Lesson1 = require("./lessons/Lesson1");

module.exports = class LessonFactory {
  static createLesson(id) {
    let lesson = null;

    if (id === 1) {
      lesson = new Lesson1();
    }

    return lesson;
  }
};
