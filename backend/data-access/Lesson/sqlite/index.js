const db = require("../../../db/sqlite/Database");

function getAll() {
  return db.all(`SELECT * FROM lessons`);
}

function getLessonById(id) {
  return db.get(`SELECT * FROM lessons WHERE id = ?`, [id]);
}

function getLessonsByCategoryId(category_id) {
  return db.all(`SELECT * FROM lessons WHERE category_id = ?`, [category_id]);
}

function getLessonsCategories() {
  return db.all("SELECT * FROM lessons_categories");
}

module.exports = {
  getAll,
  getLessonById,
  getLessonsCategories,
  getLessonsByCategoryId,
};
