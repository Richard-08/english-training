const db = require("../../../db/sqlite/Database");

function create({ username, email, password }) {
  return db.run(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, password]
  );
}

function findUserById(id) {
  return db.get(`SELECT * FROM users WHERE id = ?`, [id]);
}

function findUserByEmail(email) {
  return db.get(`SELECT * FROM users WHERE email = ?`, [email]);
}

function deleteUserByEmail(email) {
  return db.run(`DELETE FROM users WHERE email = ?`, [email]);
}

module.exports = {
  create,
  findUserById,
  findUserByEmail,
  deleteUserByEmail
};
