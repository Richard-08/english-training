const db = require("../../../db/sqlite/Database");

function getLessonStats({ lesson_id, user_id }) {
  return db.get(
    `SELECT * FROM lessons_statistics WHERE lesson_id = ? AND user_id = ?`,
    [lesson_id, user_id]
  );
}

function createLessonStats(payload) {
  let { lesson_id, user_id, started_at } = payload;

  return db.run(
    `INSERT INTO lessons_statistics (lesson_id, user_id, started_at) VALUES (?, ?, ?)`,
    [lesson_id, user_id, started_at]
  );
}

function updateLessonStats(payload) {
  let { lesson_id, user_id, repetitions, progress, last_visit, end_at } =
    payload;
  return db.run(
    `UPDATE lessons_statistics SET repetitions = ?, progress = ?, last_visit = ?, end_at = ? WHERE lesson_id= ? AND user_id = ?`,
    [repetitions, progress, last_visit, end_at, lesson_id, user_id]
  );
}

function resetLessonStats(payload) {
  let { lesson_id, user_id, progress, last_visit, started_at, end_at } =
    payload;
  return db.run(
    `UPDATE lessons_statistics SET started_at = ?, progress = ?, last_visit = ?, end_at = ? WHERE lesson_id= ? AND user_id = ?`,
    [started_at, progress, last_visit, end_at, lesson_id, user_id]
  );
}

module.exports = {
  getLessonStats,
  createLessonStats,
  updateLessonStats,
  resetLessonStats
};
