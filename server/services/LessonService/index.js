const Lesson = require("../../data-access/Lesson");
const LessonFactory = require("./LessonFactory");
class LessonService {
  constructor(LessonModel, LessonFacotory) {
    this.lessonModel = LessonModel;
    this.factory = LessonFacotory;
  }

  async getLessons() {
    try {
      const lessons = await this.lessonModel.getAll();
      return lessons;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  async getLesson(lessonId) {
    let lesson = this.factory.createLesson(lessonId);
    return lesson.getLesson();
  }
}

module.exports = new LessonService(Lesson, LessonFactory);
