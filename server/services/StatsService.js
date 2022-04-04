const UserStats = require("../data-access/UserStatistics");
const { getRandomNumber, getRandomColor } = require("../utils/helpers");

const lessons = [
  "a/an, some, the",
  "Present/Past/Future Simple",
  "this/that, these/those",
  "my, your, his, her, its, our, their",
];

function getFakeData(n) {
  let ret = [];
  for (let i = 0; i < n; i += 1) {
    ret.push({
      category_id: 2,
      completed_tasks: Math.floor(Math.random() * 25),
      date: `${getRandomNumber(20, 31)}.04.2022`,
      id: 4,
      lesson_id: 4,
      name: lessons[Math.floor(Math.random() * lessons.length)],
      user_id: 1,
    });
  }
  return ret.sort(
    (a, b) => parseInt(a.date.split(".")[0]) - parseInt(b.date.split(".")[0])
  );
}

function getWeekAgregatedStat(data) {
  const COUNT = 7;
  let date = 30;
  let set = new Set();
  let ret = {};
  data.forEach((item) => {
    let day = parseInt(item.date.split(".")[0]);
    if (date - day <= COUNT) {
      set.add(item.name);

      if (ret[item.date]) {
        if (ret[item.date][item.name]) {
          ret[item.date][item.name] += item.completed_tasks;
        } else {
          ret[item.date][item.name] = item.completed_tasks;
        }
      } else {
        ret[item.date] = {};
        ret[item.date][item.name] = item.completed_tasks;
      }
    }
  });
  return {
    stat: ret,
    set: Array.from(set),
  };
}

function getMonthAgregatedStat(data) {
  let current_month = new Date().getMonth() + 1;
  let set = new Set();
  let ret = {};

  data.forEach((item) => {
    let month = parseInt(item.date.split(".")[1]);
    if (current_month === month) {
      set.add(item.name);

      if (ret[item.date]) {
        if (ret[item.date][item.name]) {
          ret[item.date][item.name] += item.completed_tasks;
        } else {
          ret[item.date][item.name] = item.completed_tasks;
        }
      } else {
        ret[item.date] = {};
        ret[item.date][item.name] = item.completed_tasks;
      }
    }
  });
  return {
    stat: ret,
    set: Array.from(set),
  };
}

function getFormattedStat({ stat, set }) {
  let labels = Object.keys(stat);
  let datasets = [];

  set.forEach((name) => {
    let data = [];
    labels.forEach((label) => {
      data.push(stat[label][name] || 0);
    });
    datasets.push({
      label: name,
      data,
      backgroundColor: getRandomColor(150, 255),
    });
  });

  return {
    labels,
    datasets,
  };
}

class StatsService {
  constructor(userStatsModel) {
    this.userStatsModel = userStatsModel;
  }

  getUserStats(id) {
    //return this.userStatsModel.getUserStats(id);
    let data = getFakeData(30);

    let week_data = getWeekAgregatedStat(data);
    let week_stat = getFormattedStat(week_data);

    let month_data = getMonthAgregatedStat(data);
    let month_stat = getFormattedStat(month_data);

    return { week: week_stat, month: month_stat };
  }
}

module.exports = new StatsService(UserStats);
