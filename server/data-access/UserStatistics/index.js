const db = require("../../../db/sqlite/Database");

function createUserStat({ lesson_id, user_id, date, tasks_count }) {
  return db.run(
    `INSERT INTO user_statistics (lesson_id, user_id, date, tasks_count) VALUES (?, ?, ?, ?)`,
    [lesson_id, user_id, date, tasks_count]
  );
}

function getUserStats({ lesson_id, user_id }) {
  return db.all(
    `SELECT * FROM user_statistics WHERE lesson_id = ? AND user_id = ?`,
    [lesson_id, user_id]
  );
}

module.exports = {
  createUserStat,
  getUserStats,
};
