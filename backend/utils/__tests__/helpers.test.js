const {
  getFormattedDate,
  getRandomNumber,
  getRandomRGB,
} = require("../helpers");

describe("getFormattedDate", () => {
  test("Should return 2022-04-13", () => {
    expect(getFormattedDate(new Date(2022, 3, 13))).toBe("2022-04-13");
  });

  test("Should return 2022-04-13", () => {
    expect(getFormattedDate("Wed Apr 13 2022")).toBe("2022-04-13");
  });

  test("Should return 2022-04-13", () => {
    expect(getFormattedDate("2022, 04, 13")).toBe("2022-04-13");
  });

  test("Should return 2022-04-13", () => {
    expect(getFormattedDate(1649797200000)).toBe("2022-04-13");
  });

  test("Should return 2022-04-13", () => {
    expect(getFormattedDate(0)).toBe("1970-01-01");
  });
});

describe("getRandomNumber", () => {
  test("Must be greater than or equal to 0", () => {
    expect(getRandomNumber(0, 3)).toBeGreaterThanOrEqual(0);
  });

  test("Must be less than or equal to 3", () => {
    expect(getRandomNumber(0, 3)).toBeLessThanOrEqual(3);
  });

  test("Shouldn't be greater than 3", () => {
    expect(getRandomNumber(0, 3)).not.toBeGreaterThan(3);
  });

  test("Shouldn't be less than 0", () => {
    expect(getRandomNumber(0, 3)).not.toBeLessThan(0);
  });
});

describe("getRandomRGB", () => {
  const rgb_regex = /rgb\(\d+, \d+, \d+\)/;

  test("Should return rgba(num, num, num)", () => {
    expect(getRandomRGB(0, 255)).toMatch(rgb_regex);
  });

  test("Should return rgba(num, num, num)", () => {
    expect(getRandomRGB()).toMatch(rgb_regex);
  });
});
