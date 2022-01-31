const db = require("../../../db/sqlite/Database");

function getBasicDictionary() {
  return db.all(`SELECT * FROM basic_words`);
}

function getBasicCategories() {
  return db.all(`SELECT * FROM basic_categories;`);
}

function getDictionary() {
  return db.all(`SELECT * FROM words`);
}

function getCategories() {
  return db.all(`SELECT * FROM categories;`);
}

function getWordsByCategory(category_id) {
  return db.all(`SELECT * FROM words WHERE category_id = ?`, [category_id]);
}

function addWord({ category_id, en, ru }) {
  return db.run(
    `INSERT INTO words (user_id, category_id, en, ru) VALUES (?, ?, ?)`,
    [user_id, category_id, en, ru]
  );
}

function deleteWord({ user_id, word_id }) {
  return db.run(`DELETE FROM words WHERE id=${word_id} AND user_id=${user_id}`);
}

function addCategory(name) {
  return db.run(`INSERT INTO categories (name) VALUES (?)`, [name]);
}

module.exports = {
  addWord,
  deleteWord,
  addCategory,
  getDictionary,
  getCategories,
  getWordsByCategory,
  getBasicDictionary,
  getBasicCategories,
};
