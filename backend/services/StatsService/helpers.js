const {
  getRandomNumber,
  getRandomRGB,
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
    let day = getRandomNumber(1, 29);
    ret.push({
      category_id: 2,
      completed_tasks: Math.floor(Math.random() * 25),
      date: `2022-05-${day < 10 ? `0${day}` : day}`,
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

/**
 * @description compares dates with a given accuracy
 * @param {string | Date} date1 valid date string (2022-04-06) or Date object
 * @param {string | Date} date2 valid date string (2022-04-06) or Date object
 * @param {string} accuracy possible values - day, month, year
 * @returns {boolean} true/false
 */

function isEqualDates(date1, date2, accuracy = "day") {
  if (typeof date1 === "string") {
    date1 = new Date(date1);
  }
  if (typeof date2 === "string") {
    date2 = new Date(date2);
  }

  let day1 = date1.getDate();
  let day2 = date2.getDate();

  let month1 = date1.getMonth() + 1;
  let month2 = date2.getMonth() + 1;

  let year1 = date1.getFullYear();
  let year2 = date2.getFullYear();

  if (accuracy === "year") {
    return year1 === year2;
  } else if (accuracy === "month") {
    return month1 === month2 && year1 === year2;
  } else if (accuracy === "day") {
    return day1 === day2 && month1 === month2 && year1 === year2;
  }
}

function getWeekAgregatedStat(data) {
  let dates = getLast7DaysDates();
  let set = new Set();
  let ret = {};

  dates.forEach((day) => {
    ret[day] = {};
    data.forEach((item) => {
      if (isEqualDates(day, item.date, "day")) {
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
  let current_date = new Date();
  let set = new Set();
  let ret = {};

  data.forEach((item) => {
    if (isEqualDates(current_date, item.date, "month")) {
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
  let current_date = new Date();
  let set = new Set();
  let ret = {};

  MONTHS.forEach((month) => {
    ret[month] = {};
    data.forEach((item) => {
      if (isEqualDates(current_date, item.date, "year")) {
        let month_name = MONTHS[new Date(item.date).getMonth()];
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
    let year = new Date(item.date).getFullYear();
    set.add(item.name);
    ret = setObjectValue(ret, year, item.name, item.completed_tasks);
  });

  return {
    stat: ret,
    set: Array.from(set),
  };
}

/**
 * @description formatting stats for chart data
 * @param {Array} stat agregated stat data
 * @param {Array} set dates set
 * @returns {Object} {labels: [], datasets: []}
 */

function getFormattedStat({ stat, set }, colors) {
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
      backgroundColor: colors[name],
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
  getLast7DaysDates,
};
