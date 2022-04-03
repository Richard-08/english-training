const UserStats = require("../data-access/UserStatistics");

class StatsService {
  constructor(userStatsModel) {
    this.userStatsModel = userStatsModel;
  }

  getUserStats(id) {
    return this.userStatsModel.getUserStats(id);
  }
}

module.exports = new StatsService(UserStats);
