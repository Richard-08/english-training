const db = require("../../../db/sqlite/Database");

function createUserStat({ lesson_id, user_id, date, completed_tasks }) {
  return db.run(
    `INSERT INTO user_statistics (lesson_id, user_id, date, completed_tasks) VALUES (?, ?, ?, ?)`,
    [lesson_id, user_id, date, completed_tasks]
  );
}

function getUserStats(user_id) {
  return db.all(
    `SELECT * FROM lessons LEFT JOIN user_statistics ON lessons.id = user_statistics.lesson_id WHERE user_statistics.user_id = ?;`,
    [user_id]
  );
}

function getSumOfCompletedByDate(user_id, date) {
  return db.run(
    `SELECT sum(completed_tasks) FROM user_statistics WHERE date = ? AND user_id = ?`,
    [date, user_id]
  );
}

function getSumOfCompletedAll(user_id) {
  return db.run(
    `SELECT sum(completed_tasks) FROM user_statistics WHERE user_id = ?`,
    [user_id]
  );
}

function getUniqueOrderedDates(user_id) {
  return db.all(
    `SELECT DISTINCT date FROM user_statistics WHERE user_id = ? ORDER BY date ASC;`,
    [user_id]
  );
}

module.exports = {
  createUserStat,
  getUserStats,
  getSumOfCompletedByDate,
  getSumOfCompletedAll,
  getUniqueOrderedDates,
};
