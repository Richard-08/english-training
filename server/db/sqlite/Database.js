const path = require("path");
const sqlite3 = require("sqlite3").verbose();

class Database {
  constructor() {
    this.db = null;
  }

  open(db_file) {
    return new Promise((resolve, reject) => {
      const connection = new sqlite3.Database(path.resolve('server', db_file), (err) => {
        if (err) {
          console.log("Connect error", error);
        } else {
          this.db = connection;
          resolve(connection);
        }
      });
    });
  }

  run(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err, res) {
        if (err) {
          console.log("Error running sql", sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  get(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          console.log("Error running sql", sql);
          console.log(err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql", sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close();
      resolve(true);
    });
  }
}

module.exports = new Database();
