const UserStats = require("../../data-access/UserStatistics");

const {
  getFakeData,
  getAgregatedStat,
  getFormattedStat,
} = require("./helpers");

class StatsService {
  constructor(userStatsModel) {
    this.userStatsModel = userStatsModel;
  }

  getUserStats(id) {
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

    return {
      week: week_stat,
      month: month_stat,
      year: year_stat,
      total: total_stat,
    };
  }
}

module.exports = new StatsService(UserStats);
