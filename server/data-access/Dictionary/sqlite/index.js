const db = require("../../../db/sqlite/Database");

function getDictionary(user_id) {
  return db.all(
    `SELECT id, en, ru, category_id, NULL as user_id FROM basic_words UNION SELECT id, en, ru, category_id, user_id FROM user_words WHERE user_id = ? ORDER BY en`,
    [user_id]
  );
}

function getCategories(user_id) {
  return db.all(
    `SELECT id, name, NULL as user_id FROM basic_categories UNION SELECT id, name, user_id FROM user_categories WHERE user_id = ? ORDER BY name`,
    [user_id]
  );
}

function findUserWord(en, ru, category_id) {
  return db.get(
    `SELECT * FROM user_words WHERE en = ? AND ru = ? AND category_id = ?`,
    [en, ru, category_id]
  );
}

function findBasicWord(en, ru, category_id) {
  return db.get(
    `SELECT * FROM basic_words WHERE en = ? AND ru = ? AND category_id = ?`,
    [en, ru, category_id]
  );
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

function addCategory({ name, user_id }) {
  return db.run(`INSERT INTO user_categories (name, user_id) VALUES (?, ?)`, [
    name,
    user_id,
  ]);
}

function deleteCategory({ id, user_id }) {
  return db.run(
    `DELETE FROM user_categories WHERE id=${id} AND user_id=${user_id}`
  );
}

function findUserCategory(name) {
  return db.get(`SELECT * FROM user_categories WHERE name = ?`, [name]);
}

function findBasicCategory(name) {
  return db.get(`SELECT * FROM basic_categories WHERE name = ?`, [name]);
}

module.exports = {
  addWord,
  deleteWord,
  addCategory,
  deleteCategory,
  findUserWord,
  findBasicWord,
  findUserCategory,
  findBasicCategory,
  getDictionary,
  getCategories,
  getWordsByCategory,
};
