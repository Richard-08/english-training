const db = require("../../../db/sqlite/Database");

function getLessonStatistics({ lesson_id, user_id }) {
  return db.get(
    `SELECT * FROM lessons_statistics WHERE lesson_id = ? AND user_id = ?`,
    [lesson_id, user_id]
  );
}

function insertLessonStatistics(payload) {
  let { lesson_id, user_id, started_at } = payload;

  return db.run(
    `INSERT INTO lessons_statistics (lesson_id, user_id, started_at) VALUES (?, ?, ?)`,
    [lesson_id, user_id, started_at]
  );
}

function updateLessonStatistics(payload) {
  let { lesson_id, user_id, repetitions, progress, last_visit } = payload;
  return db.run(
    `UPDATE lessons_statistics SET (lesson_id, user_id, repetitions, progress, last_visit) VALUES (?, ?, ?, ?, ?) WHERE lesson_id=${lesson_id} AND user_id = ${user_id}`,
    [lesson_id, user_id, repetitions, progress, last_visit]
  );
}

module.exports = {
  getLessonStatistics,
  insertLessonStatistics,
  updateLessonStatistics,
};
