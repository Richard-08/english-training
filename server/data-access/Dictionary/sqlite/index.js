const db = require("../../../db/sqlite/Database");

function getDictionary() {
  return db.all(`SELECT * FROM dictionary`);
}

function getCategories() {
  return db.all(`SELECT * FROM categories;`);
}

function getWordsByCategory(category_id) {
  return db.all(`SELECT * FROM dictionary WHERE category_id = ?`, [
    category_id,
  ]);
}

function addWord({ category_id, en, ru }) {
  return db.run(
    `INSERT INTO dictionary (category_id, en, ru) VALUES (?, ?, ?)`,
    [category_id, en, ru]
  );
}

function deleteWord(word_id) {
  return db.run(`DELETE FROM dictionary WHERE id=${word_id}`);
}

module.exports = {
  addWord,
  deleteWord,
  getDictionary,
  getCategories,
  getWordsByCategory,
};
