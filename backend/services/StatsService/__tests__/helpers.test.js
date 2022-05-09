const {
  getFakeData,
  getAgregatedStat,
  getFormattedStat,
  getLast7DaysDates,
} = require("../helpers");
const { MONTHS } = require("../constants");
const { MOCK_DATA } = require("./constants");

describe("getAgregatedStat tests", () => {
  test("Should return stats for the week", () => {
    const week_dates = getLast7DaysDates();
    const { stat, set } = getAgregatedStat(MOCK_DATA, "week");

    expect(stat).toBeDefined();
    expect(Object.keys(stat)).toEqual(week_dates);
    expect(stat["2022-05-02"]).toEqual({ "Lesson 2": 10 });
    expect(stat["2022-05-05"]).toEqual({ "Lesson 1": 7 });
    expect(stat["2022-05-08"]).toEqual({});

    expect(set).toBeDefined();
    expect(Array.isArray(set)).toBeTruthy();
    expect(set).toEqual(["Lesson 2", "Lesson 3", "Lesson 1"]);
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
