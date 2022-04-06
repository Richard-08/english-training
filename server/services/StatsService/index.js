const UserStats = require("../../data-access/UserStatistics");
const { getFormattedDate } = require("../../utils/helpers");

const {
  getFakeData,
  getAgregatedStat,
  getFormattedStat,
} = require("./helpers");

class StatsService {
  constructor(userStatsModel) {
    this.userStatsModel = userStatsModel;
  }

  async getUserStats(id) {
    //return this.userStatsModel.getUserStats(id);
    let data = getFakeData(30);

    let week_data = getAgregatedStat(data, "week");
    let week_stat = getFormattedStat(week_data);

    let month_data = getAgregatedStat(data, "month");
    let month_stat = getFormattedStat(month_data);

    let year_data = getAgregatedStat(data, "year");
    let year_stat = getFormattedStat(year_data);

    let total_data = getAgregatedStat(data, "total");
    let total_stat = getFormattedStat(total_data);

    let today_completed = await this.userStatsModel.getSumOfCompletedByDate(
      id,
      getFormattedDate(new Date())
    );
    let total_completed = await this.userStatsModel.getSumOfCompletedAll(id);
    let total_days = this.getTotaldays(data);

    return {
      stats: {
        today: today_completed.id,
        total: total_completed.id,
        days: total_days,
      },
      week: week_stat,
      month: month_stat,
      year: year_stat,
      total: total_stat,
    };
  }

  getTotaldays(data) {
    return data.reduce((total, item) => {
      total.add(item.date);
      return total;
    }, new Set()).size;
  }
}

module.exports = new StatsService(UserStats);
