const {
  getFormattedDate,
  getRandomNumber,
  getRandomColor,
} = require("../helpers");

test("Should return 2022-04-13", () => {
  expect(getFormattedDate(new Date(2022, 3, 13))).toBe("2022-04-13");
});

test("Should return 2022-04-13", () => {
  expect(getFormattedDate("Wed Apr 13 2022")).toBe("2022-04-13");
});

test("Should return 2022-04-13", () => {
  expect(getFormattedDate("2022, 04, 13")).toBe("2022-04-13");
});
