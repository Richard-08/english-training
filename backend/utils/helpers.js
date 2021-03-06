/**
 * @description date formatting
 * @param {string | Date} date
 * @returns {string} 03.04.2022
 */

function getFormattedDate(date) {
  let formatting_date = date;
  if (typeof date === "string" || typeof date === "number") {
    formatting_date = new Date(date);
  }

  let day = formatting_date.getDate();
  let month = formatting_date.getMonth() + 1;
  let year = formatting_date.getFullYear();

  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;

  return `${year}-${month}-${day}`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomRGB(min = 0, max = 255) {
  let red = getRandomNumber(min, max);
  let green = getRandomNumber(min, max);
  let blue = getRandomNumber(min, max);
  return `rgb(${red}, ${green}, ${blue})`;
}

module.exports = {
  getFormattedDate,
  getRandomNumber,
  getRandomRGB,
};
