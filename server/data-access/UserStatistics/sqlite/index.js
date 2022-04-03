const db = require("../../../db/sqlite/Database");

function createUserStat({ lesson_id, user_id, date, completed_tasks }) {
  return db.run(
    `INSERT INTO user_statistics (lesson_id, user_id, date, completed_tasks) VALUES (?, ?, ?, ?)`,
    [lesson_id, user_id, date, completed_tasks]
  );
}

function getUserStats(user_id) {
  return db.all(`SELECT * FROM user_statistics WHERE user_id = ?`, [user_id]);
}

module.exports = {
  createUserStat,
  getUserStats,
};
