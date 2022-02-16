const Lesson = require("../../data-access/Lesson");
const LessonStatistics = require("../../data-access/LessonStatistics");
const LessonFactory = require("./LessonFactory");
class LessonService {
  constructor(LessonModel, LessonStatisticsModel, LessonFacotory) {
    this.lessonModel = LessonModel;
    this.lessonStatsModel = LessonStatisticsModel;
    this.factory = LessonFacotory;
  }

  getLessons() {
    return this.lessonModel.getAll();
  }

  async getLesson(payload) {
    try {
      let lesson = this.factory.createLesson(payload.lesson_id);

      if (!lesson) {
        throw new Error(`There is no lesson for this id=${payload.lesson_id}`);
      }

      let stats = await this.getLessonStats(payload);
      let lesson_data = await lesson.getLesson();
      return { ...lesson_data, stats };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  getLessonStats(payload) {
    return this.lessonStatsModel.getLessonStatistics(payload);
  }
}

module.exports = new LessonService(Lesson, LessonStatistics, LessonFactory);
