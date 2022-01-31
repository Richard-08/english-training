const db = require("../../../db/sqlite/Database");

function getAll() {
  return db.all(`SELECT * FROM lessons;`);
}

function getLessonById(id) {
  return db.get(`SELECT * FROM lessons WHERE id = ?`, [id]);
}

function getLessonsByCategoryId(category_id) {
  return db.all(`SELECT * FROM lessons WHERE category_id = ?`, [category_id]);
}

function updateLesson({ lesson_id, repetitions }) {
  return db.run(`UPDATE lessons SET repetitions = ? WHERE id=${lesson_id}`, [
    repetitions,
  ]);
}

module.exports = {
  getAll,
  getLessonById,
  getLessonsByCategoryId,
  updateLesson
};
