const db = require("../../../db/sqlite/Database");

function getBasicDictionary() {
  return db.all(`SELECT * FROM basic_words`);
}

function getBasicCategories() {
  return db.all(`SELECT * FROM basic_categories;`);
}

function getDictionary(user_id) {
  return db.all(`SELECT * FROM user_words WHERE user_id = ?`, [user_id]);
}

function getCategories(user_id) {
  return db.all(`SELECT * FROM user_categories WHERE user_id = ?`, [user_id]);
}

function findWordByValues({ en, ru }) {
  return db.get(`SELECT * FROM user_words WHERE en = ? AND ru = ?`, [en, ru]);
}

function getWordsByCategory(category_id) {
  return db.all(`SELECT * FROM user_words WHERE category_id = ?`, [
    category_id,
  ]);
}

function addWord({ user_id, category_id, en, ru }) {
  return db.run(
    `INSERT INTO user_words (user_id, category_id, en, ru) VALUES (?, ?, ?, ?)`,
    [user_id, category_id, en, ru]
  );
}

function deleteWord({ user_id, word_id }) {
  return db.run(
    `DELETE FROM user_words WHERE id=${word_id} AND user_id=${user_id}`
  );
}

function addCategory(name) {
  return db.run(`INSERT INTO user_categories (name) VALUES (?)`, [name]);
}

module.exports = {
  addWord,
  deleteWord,
  addCategory,
  findWordByValues,
  getDictionary,
  getCategories,
  getWordsByCategory,
  getBasicDictionary,
  getBasicCategories,
};
