const db = require("../../../db/database");

function getAll() {
  return db.all(`SELECT * FROM lessons;`);
}

function getLessonById(id) {
  return db.get(`SELECT * FROM lessons WHERE id = ?`, [id]);
}

module.exports = {
  getAll,
  getLessonById,
};
