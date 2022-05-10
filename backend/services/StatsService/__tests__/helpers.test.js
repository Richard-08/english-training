const {
  getFakeData,
  getAgregatedStat,
  getFormattedStat,
  getLast7DaysDates,
} = require("../helpers");
const { MONTHS } = require("../constants");
const { MOCK_DATA } = require("./constants");
const { getRandomRGB } = require("../../../utils/helpers");

function getLessonsColors(lessons) {
  return lessons.reduce((total, lesson) => {
    total[lesson.name] = getRandomRGB(150, 255);
    return total;
  }, {});
}

const colors = getLessonsColors(MOCK_DATA);

describe("getAgregatedStat tests", () => {
  test("Should return stats for the week", () => {
    const week_dates = getLast7DaysDates();
    const { stat, set } = getAgregatedStat(MOCK_DATA, "week");

    expect(stat).toBeDefined();
    expect(Object.keys(stat)).toEqual(week_dates);

    expect(set).toBeDefined();
    expect(Array.isArray(set)).toBeTruthy();
  });

  test("Should return stats for the month", () => {
    const { stat, set } = getAgregatedStat(MOCK_DATA, "month");

    expect(stat).toBeDefined();
    expect(stat).toEqual(
      MOCK_DATA.reduce((total, item) => {
        total[item.date] = {};
        if (total[item.date][item.name]) {
          total[item.date][item.name] += item.completed_tasks;
        } else {
          total[item.date][item.name] = item.completed_tasks;
        }
        return total;
      }, {})
    );

    expect(set).toBeDefined();
    expect(Array.isArray(set)).toBeTruthy();
    expect(set).toEqual(["Lesson 1", "Lesson 2", "Lesson 3"]);
  });

  test("Should return stats for the year", () => {
    const { stat, set } = getAgregatedStat(MOCK_DATA, "year");

    expect(stat).toBeDefined();
    expect(Object.keys(stat)).toEqual(MONTHS);
    expect(stat["May"]).toEqual({
      "Lesson 1": 12,
      "Lesson 2": 11,
      "Lesson 3": 6,
    });

    expect(set).toBeDefined();
    expect(Array.isArray(set)).toBeTruthy();
    expect(set).toEqual(["Lesson 1", "Lesson 2", "Lesson 3"]);
  });

  test("Should return total stats", () => {
    const { stat, set } = getAgregatedStat(MOCK_DATA, "total");

    expect(stat).toBeDefined();
    expect(stat["2022"]).toEqual({
      "Lesson 1": 12,
      "Lesson 2": 11,
      "Lesson 3": 6,
    });

    expect(set).toBeDefined();
    expect(Array.isArray(set)).toBeTruthy();
    expect(set).toEqual(["Lesson 1", "Lesson 2", "Lesson 3"]);
  });
});

describe("getFormattedStat tests", () => {
  test("Should return formatted data for the week", () => {
    const stat = getAgregatedStat(MOCK_DATA, "week");
    const { labels, datasets } = getFormattedStat(stat, colors);
    const week_dates = getLast7DaysDates();

    expect(labels).toBeDefined();
    expect(labels).toEqual(week_dates);

    expect(datasets).toBeDefined();
    expect(Array.isArray(datasets)).toBeTruthy();
    expect(datasets[0].label).toBeDefined();
    expect(typeof datasets[0].label).toEqual("string");
    expect(datasets[0].data).toBeDefined();
    expect(Array.isArray(datasets[0].data)).toBeTruthy();
    expect(datasets[0].backgroundColor).toBeDefined();
    expect(typeof datasets[0].backgroundColor).toEqual("string");
  });

  test("Should return formatted data for the month", () => {
    const stat = getAgregatedStat(MOCK_DATA, "month");
    const { labels, datasets } = getFormattedStat(stat, colors);

    expect(labels).toBeDefined();
    expect(labels).toEqual(
      Array.from(
        MOCK_DATA.reduce((total, item) => {
          total.add(item.date);
          return total;
        }, new Set())
      )
    );

    expect(datasets).toBeDefined();
    expect(Array.isArray(datasets)).toBeTruthy();
    expect(datasets[0].label).toBeDefined();
    expect(typeof datasets[0].label).toEqual("string");
    expect(datasets[0].data).toBeDefined();
    expect(Array.isArray(datasets[0].data)).toBeTruthy();
    expect(datasets[0].backgroundColor).toBeDefined();
    expect(typeof datasets[0].backgroundColor).toEqual("string");
  });

  test("Should return formatted data for the year", () => {
    const stat = getAgregatedStat(MOCK_DATA, "year");
    const { labels, datasets } = getFormattedStat(stat, colors);

    expect(labels).toBeDefined();
    expect(labels).toEqual(MONTHS);

    expect(datasets).toBeDefined();
    expect(Array.isArray(datasets)).toBeTruthy();
    expect(datasets[0].label).toBeDefined();
    expect(typeof datasets[0].label).toEqual("string");
    expect(datasets[0].data).toBeDefined();
    expect(Array.isArray(datasets[0].data)).toBeTruthy();
    expect(datasets[0].backgroundColor).toBeDefined();
    expect(typeof datasets[0].backgroundColor).toEqual("string");
  });

  test("Should return total formatted data", () => {
    const stat = getAgregatedStat(MOCK_DATA, "total");
    const { labels, datasets } = getFormattedStat(stat, colors);

    expect(labels).toBeDefined();
    expect(Array.isArray(labels)).toBeTruthy();
    expect(labels).toContain("2022");

    expect(datasets).toBeDefined();
    expect(Array.isArray(datasets)).toBeTruthy();
    expect(datasets[0].label).toBeDefined();
    expect(typeof datasets[0].label).toEqual("string");
    expect(datasets[0].data).toBeDefined();
    expect(Array.isArray(datasets[0].data)).toBeTruthy();
    expect(datasets[0].backgroundColor).toBeDefined();
    expect(typeof datasets[0].backgroundColor).toEqual("string");
  });
});
