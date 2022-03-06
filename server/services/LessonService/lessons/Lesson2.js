module.exports = class Lesson2 {
  constructor(LessonModel) {
    this.lessonModel = LessonModel;
  }

  async getLesson(id) {
    try {
      let lesson = await this.lessonModel.getLessonById(id);
      return lesson;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
