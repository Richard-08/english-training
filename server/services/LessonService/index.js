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
      let lesson_data = await lesson.getLesson(payload.lesson_id);
      return { ...lesson_data, stats };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getLessonStats(payload) {
    let stats = await this.lessonStatsModel.getLessonStats(payload);

    if (!stats) {
      let statRecord = await this.lessonStatsModel.createLessonStats(payload);

      if (statRecord) {
        return this.lessonStatsModel.getLessonStats(payload);
      } else {
        throw Error("Error registering a statistics record");
      }
    }

    return stats;
  }
}

module.exports = new LessonService(Lesson, LessonStatistics, LessonFactory);
