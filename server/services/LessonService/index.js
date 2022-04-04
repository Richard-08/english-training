const Lesson = require("../../data-access/Lesson");
const LessonStats = require("../../data-access/LessonStatistics");
const UserStats = require("../../data-access/UserStatistics");
const LessonSettings = require("../../data-access/LessonSettings");
const LessonFactory = require("./LessonFactory");

const { getFormattedDate } = require("../../utils/helpers");
class LessonService {
  constructor(
    LessonModel,
    LessonStatsModel,
    UserStatsModel,
    LessonSettings,
    LessonFacotory
  ) {
    this.lessonModel = LessonModel;
    this.lessonStatsModel = LessonStatsModel;
    this.userStatsModel = UserStatsModel;
    this.lessonSettingsModel = LessonSettings;
    this.factory = LessonFacotory;
  }

  getLessons() {
    return this.lessonModel.getAll();
  }

  getLessonsCategories() {
    return this.lessonModel.getLessonsCategories();
  }

  async getLesson(payload) {
    try {
      let lesson = this.factory.createLesson(payload.lesson_id);

      if (!lesson) {
        throw new Error(`There is no lesson for this id=${payload.lesson_id}`);
      }

      let stats = await this.getLessonStats(payload);
      let settings = await this.getLessonSettings(payload);
      let lesson_data = await lesson.getLesson(payload.lesson_id);
      return { ...lesson_data, stats, settings };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getLessonStats(payload) {
    let stats = await this.lessonStatsModel.getLessonStats(payload);

    if (!stats) {
      let started_at = getFormattedDate(new Date());
      let statRecord = await this.lessonStatsModel.createLessonStats({
        ...payload,
        started_at,
      });

      if (statRecord) {
        return this.lessonStatsModel.getLessonStats(payload);
      } else {
        throw Error("Error registering a statistics record");
      }
    }

    return stats;
  }

  async updateLessonStats(payload) {
    try {
      const data = {
        ...payload,
        progress: payload.progress ? payload.progress + 1 : 1,
        last_visit: getFormattedDate(new Date()),
      };

      const stats_record = await this.lessonStatsModel.updateLessonStats(data);

      if (stats_record) {
        return this.getLessonStats(payload);
      } else {
        throw Error("Statistics update error");
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  async resetLessonStats(payload) {
    try {
      const data = {
        ...payload,
        progress: 0,
        started_at: getFormattedDate(new Date()),
        last_visit: null,
      };

      const stats_record = await this.lessonStatsModel.resetLessonStats(data);

      if (stats_record) {
        return this.getLessonStats(payload);
      } else {
        throw Error("Statistics reset error");
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getLessonSettings(payload) {
    let settings = await this.lessonSettingsModel.getLessonSettings(payload);

    if (!settings) {
      let settingRecord = await this.lessonSettingsModel.createLessonSettings(
        payload
      );

      if (settingRecord) {
        return this.lessonSettingsModel.getLessonSettings(payload);
      } else {
        throw Error("Settings initialization error");
      }
    }

    return settings;
  }

  async updateLessonSettings(payload) {
    try {
      const setting_record =
        await this.lessonSettingsModel.updateLessonSettings(payload);
      if (setting_record) {
        return this.getLessonSettings(payload);
      } else {
        throw Error("Settings update error");
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  createUserStat(payload) {
    this.userStatsModel.createUserStat({
      ...payload,
      date: getFormattedDate(new Date()),
    });
  }
}

module.exports = new LessonService(
  Lesson,
  LessonStats,
  UserStats,
  LessonSettings,
  LessonFactory
);
