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

    let sorted_data = Array.from(
      new Set(
        data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((item) => item.date)
      )
    );
    let consecutive_days = this.getMaxConsecutiveDays(sorted_data);

    return {
      stats: {
        today: today_completed.id,
        total: total_completed.id,
        days: total_days,
        record: consecutive_days,
        data: sorted_data,
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

module.exports = new StatsService(UserStats);
