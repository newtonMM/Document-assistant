import { ResultSetHeader } from "mysql2";
import sql from "../configs/dbconn";
import { UserProps } from "../@types/User/Index";

export class User {
  email: string;
  password: string;
  username: string;

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }

  async save() {
    const query = `INSERT INTO users( username, email, password) VALUES (?, ?, ?)`;
    return new Promise(async (resolve, reject) => {
      sql.query(
        query,
        [this.username, this.email, this.password],
        (err, result) => {
          if (err) {
            console.log("this is the error", err);
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });
  }

  static updateUserDetails = async (userDetails: UserProps, id: number) => {
    const { username, email, password } = userDetails;
    const query = `UPDATE users SET username= ? email=? password=? WHERE id=id`;
    return new Promise(async (resolve, reject) => {
      sql.query(query, [username, email, password], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };

  static deleteUser = async (id: string) => {
    const query = `DELETE FROM users WHERE id = "${id}"`;
    return new Promise((resolve, reject) => {
      sql.db.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };

  static findUserByEmail = async (email: string) => {
    const query = `SELECT *  FROM users WHERE email = "${email}"`;
    return new Promise((resolve, reject) => {
      sql.db.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (Array.isArray(results) && results.length === 0) {
          return resolve(false);
        }
        if (Array.isArray(results)) {
          resolve(results[0]);
        }
        resolve(results);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };
  static findUserByID = async (id: number) => {
    const query = `SELECT *  FROM users WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
      sql.db.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (Array.isArray(results) && results.length === 0) {
          return resolve(false);
        }
        if (Array.isArray(results)) {
          resolve(results[0]);
        }
        resolve(results);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };

  static findUserByUsername = async (username: string) => {
    const query = `SELECT *  FROM users WHERE username = "${username}"`;
    return new Promise((resolve, reject) => {
      sql.db.query<ResultSetHeader>(query, (err, results, fields) => {
        if (err) {
          reject(err);
          return;
        }
        if (Array.isArray(results) && results.length === 0) {
          return resolve(false);
        }
        if (Array.isArray(results)) {
          resolve(results[0]);
        }
        resolve(results);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };
}
