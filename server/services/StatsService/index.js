const UserStats = require("../../data-access/UserStatistics");
const { getFormattedDate } = require("../../utils/helpers");
const Logger = require("../../loaders/logger");

const {
  getFakeData,
  getAgregatedStat,
  getFormattedStat,
} = require("./helpers");

class StatsService {
  constructor(userStatsModel, Logger) {
    this.userStatsModel = userStatsModel;
    this.logger = Logger;
  }

  async getUserStats(id) {
    try {
      //return this.userStatsModel.getUserStats(id);
      let data = getFakeData(30);

      let week_stat = this.getAgregatedFormattedStats(data, "week");
      let month_stat = this.getAgregatedFormattedStats(data, "month");
      let year_stat = this.getAgregatedFormattedStats(data, "year");
      let total_stat = this.getAgregatedFormattedStats(data, "total");

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
        week: week_stat,
        month: month_stat,
        year: year_stat,
        total: total_stat,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  getAgregatedFormattedStats(data, period) {
    let agregated_data = getAgregatedStat(data, period);
    return getFormattedStat(agregated_data);
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
}

module.exports = new StatsService(UserStats, Logger);
