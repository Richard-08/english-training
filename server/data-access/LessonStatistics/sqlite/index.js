const db = require("../../../db/sqlite/Database");

function getLessonStats({ lesson_id, user_id }) {
  return db.get(
    `SELECT * FROM lessons_statistics WHERE lesson_id = ? AND user_id = ?`,
    [lesson_id, user_id]
  );
}

function createLessonStats(payload) {
  let { lesson_id, user_id } = payload;

  return db.run(
    `INSERT INTO lessons_statistics (lesson_id, user_id) VALUES (?, ?)`,
    [lesson_id, user_id]
  );
}

function updateLessonStats(payload) {
  let { lesson_id, user_id, repetitions, progress, last_visit, started_at } =
    payload;
  return db.run(
    `UPDATE lessons_statistics SET (lesson_id, user_id, repetitions, progress, last_visit, started_at) VALUES (?, ?, ?, ?, ?, ?) WHERE lesson_id=${lesson_id} AND user_id = ${user_id}`,
    [lesson_id, user_id, repetitions, progress, last_visit, started_at]
  );
}

module.exports = {
  getLessonStats,
  createLessonStats,
  updateLessonStats,
};
