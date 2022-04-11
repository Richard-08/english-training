const db = require("../../../db/sqlite/Database");

function getLessonSettings({ lesson_id, user_id }) {
  return db.get(
    `SELECT * FROM lessons_settings WHERE lesson_id = ? AND user_id = ?`,
    [lesson_id, user_id]
  );
}

function createLessonSettings(payload) {
  let { lesson_id, user_id } = payload;

  return db.run(
    `INSERT INTO lessons_settings (lesson_id, user_id) VALUES (?, ?)`,
    [lesson_id, user_id]
  );
}

function updateLessonSettings(payload) {
  let { lesson_id, user_id, repetitions } = payload;
  return db.run(
    `UPDATE lessons_settings SET repetitions = ? WHERE lesson_id= ? AND user_id = ?`,
    [repetitions, lesson_id, user_id]
  );
}

module.exports = {
  getLessonSettings,
  createLessonSettings,
  updateLessonSettings,
};
