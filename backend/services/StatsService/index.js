const UserStats = require("../../data-access/UserStatistics");
const Lesson = require("../../data-access/Lesson");
const { getFormattedDate } = require("../../utils/helpers");
const Logger = require("../../loaders/logger");

const { getRandomRGB } = require("../../utils/helpers");
const { STAT_PERIODS } = require("./constants");

const {
  getFakeData,
  getAgregatedStat,
  getFormattedStat,
} = require("./helpers");

class StatsService {
  constructor(UserStats, Lesson, Logger) {
    this.userStatsModel = UserStats;
    this.lessonModel = Lesson;

    this.logger = Logger;

    this.stat_periods = STAT_PERIODS;
  }

  async getUserStats(id) {
    try {
      //return this.userStatsModel.getUserStats(id);
      let data = getFakeData(30);

      let lessons = await this.lessonModel.getAll();
      let lessons_colors = this.getLessonsColors(lessons);

      let lessons_stats = this.getFormattedLessonsStats(
        data,
        lessons,
        lessons_colors
      );

      let stats_by_periods = this.getStatsByPeriod(data, lessons_colors);

      let date = getFormattedDate(new Date());
      let today_completed = await this.userStatsModel.getSumOfCompletedByDate(
        id,
        date
      );

      let total_completed = await this.userStatsModel.getSumOfCompletedAll(id);

      let total_days = await this.userStatsModel.getUniqueOrderedDates(id);
      let formatted_data = total_days.map((item) => item.date);
      let consecutive_days = this.getMaxConsecutiveDays(formatted_data);

      return {
        stats: {
          today: today_completed.id,
          total: total_completed.id,
          days: total_days.length,
          record: consecutive_days,
          dates: formatted_data,
        },
        ...stats_by_periods,
        lessons: lessons_stats,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  /**
   * @description returns formatted stat for charts
   * @param {Array} data stats data
   * @param {string} period stat period. Possible period - this.stat_periods
   * @param {Array} colors lessons colors
   * @returns {Object} {datasets: [], labels: []}
   */

  getChartData(data, period, colors) {
    let agregated_data = getAgregatedStat(data, period);
    return getFormattedStat(agregated_data, colors);
  }

  /**
   *
   * @param {Array} data stats data
   * @param {Array} colors lessons colors
   * @returns {Object} {week: {datasets: [], labels: []}, month: {}, year: {}, total: {}}
   */

  getStatsByPeriod(data, colors) {
    let ret = {};
    this.stat_periods.forEach((period) => {
      ret[period] = this.getChartData(data, period, colors);
    });

    return ret;
  }

  getFormattedLessonsStats(stats, lessons, colors) {
    let agregated = this.getAgregatedLessonStata(stats);

    return lessons.map((lesson) => {
      let data = agregated[lesson.name];
      return {
        ...lesson,
        days: data ? data.days.size : 0,
        tasks: data ? data.tasks : 0,
        color: colors[lesson.name],
      };
    });
  }

  /**
   *
   * @param {Array} stats stats data
   * @returns {Object} agregated lessons stats {lesson: {days: ['2022-04-06','2022-04-07'], tasks: 10}}
   */

  getAgregatedLessonStata(stats) {
    let agregated = {};

    stats.forEach((stat) => {
      if (agregated[stat.name]) {
        agregated[stat.name]["days"].add(stat.date);
        agregated[stat.name]["tasks"] += stat.completed_tasks;
      } else {
        agregated[stat.name] = {};
        agregated[stat.name]["days"] = new Set([stat.date]);
        agregated[stat.name]["tasks"] = stat.completed_tasks;
      }
    });

    return agregated;
  }

  /**
   *
   * @param {Array} data sorted ascending and unique dates
   * @returns {number} count of max consecutive days
   */
  getMaxConsecutiveDays(data) {
    let days = [];
    let length = data.length;
    let count = 1;
    for (let i = 0; i < length; i += 1) {
      if (data[i] && data[i - 1]) {
        let next = new Date(data[i]).getDate();
        let prev = new Date(data[i - 1]).getDate();
        if (next - prev === 1) {
          count += 1;
        } else {
          days.push(count);
          count = 1;
        }
      }
    }
    days.push(count);
    return Math.max(...days);
  }

  getLessonsColors(lessons) {
    return lessons.reduce((total, lesson) => {
      total[lesson.name] = getRandomRGB(150, 255);
      return total;
    }, {});
  }
}

module.exports = new StatsService(UserStats, Lesson, Logger);
