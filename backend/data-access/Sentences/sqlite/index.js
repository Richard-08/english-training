const db = require("../../../db/sqlite/Database");

function findSentencesByLessonId(id) {
  return db.all(`SELECT * FROM sentences WHERE lesson_id = ?`, [id]);
}

function getRandomSentencesByLessonId(id, limit) {
  return db.all(
    `SELECT * FROM sentences WHERE lesson_id = ? ORDER BY random() LIMIT ${limit}`,
    [id]
  );
}

module.exports = {
  findSentencesByLessonId,
  getRandomSentencesByLessonId
};
