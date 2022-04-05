const {
  getRandomNumber,
  getRandomColor,
  getFormattedDate,
} = require("../../utils/helpers");
const { MONTHS } = require("./constants");

const lessons = [
  "a/an, some, the",
  "Present/Past/Future Simple",
  "this/that, these/those",
  "my, your, his, her, its, our, their",
];

function getFakeData(n) {
  let ret = [];
  for (let i = 0; i < n; i += 1) {
    let day = getRandomNumber(1, 31);
    ret.push({
      category_id: 2,
      completed_tasks: Math.floor(Math.random() * 25),
      date: `${day < 10 ? `0${day}` : day}.04.2022`,
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

function setObjectValue(data, parent, child, value) {
  if (data[parent]) {
    if (data[parent][child]) {
      data[parent][child] += value;
    } else {
      data[parent][child] = value;
    }
  } else {
    data[parent] = {};
    data[parent][child] = value;
  }

  return data;
}

function getLast7DaysDates() {
  let dates = [];
  const DAY = 86400000;

  for (let i = 7; i >= 1; i -= 1) {
    dates.push(getFormattedDate(new Date(new Date().valueOf() - DAY * i)));
  }

  return dates;
}

function getWeekAgregatedStat(data) {
  let dates = getLast7DaysDates();
  let set = new Set();
  let ret = {};
  dates.forEach((day) => {
    ret[day] = {};
    data.forEach((item) => {
      if (day === item.date) {
        set.add(item.name);
        ret = setObjectValue(ret, day, item.name, item.completed_tasks);
      }
    });
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
      ret = setObjectValue(ret, item.date, item.name, item.completed_tasks);
    }
  });
  return {
    stat: ret,
    set: Array.from(set),
  };
}

function getYearAgregatedStat(data) {
  let current_year = new Date().getFullYear();
  let set = new Set();
  let ret = {};
  MONTHS.forEach((month) => {
    ret[month] = {};
    data.forEach((item) => {
      let date = item.date.split(".");
      let year = parseInt(date[2]);
      if (current_year === year) {
        let month_name = MONTHS[parseInt(date[1]) - 1];
        if (month === month_name) {
          set.add(item.name);
          ret = setObjectValue(
            ret,
            month_name,
            item.name,
            item.completed_tasks
          );
        }
      }
    });
  });

  return {
    stat: ret,
    set: Array.from(set),
  };
}

function getTotalAgregatedStat(data) {
  let set = new Set();
  let ret = {};

  data.forEach((item) => {
    let date = item.date.split(".");
    let year = parseInt(date[2]);
    set.add(item.name);
    ret = setObjectValue(ret, year, item.name, item.completed_tasks);
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

const HANDLERS = {
  week: getWeekAgregatedStat,
  month: getMonthAgregatedStat,
  year: getYearAgregatedStat,
  total: getTotalAgregatedStat,
};

function getAgregatedStat(data, period) {
  if (HANDLERS[period]) {
    return HANDLERS[period](data);
  }
  throw new Error(period, +" period handler is not defined");
}

module.exports = {
  getFakeData,
  getAgregatedStat,
  getFormattedStat,
};
