import sql from "../configs/dbconn";

export class Content {
  constructor() {}

  static createContent = async (
    text: string,
    p_id: number,
    document_id: number
  ) => {
    const query = `INSERT INTO content (text, p_id, document_id) VALUES (?, ?, ?)`;
    return new Promise(async (resolve, reject) => {
      sql.query(query, [text, p_id, document_id], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        if (Array.isArray(result)) {
          return resolve(result[0]);
        }
        resolve(result);
      });
    });
  };

  static deleteContent = async (id: number) => {
    const query = `DELETE FROM content WHERE id = "${id}"`;
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

  static findContent = async (id: number) => {
    const query = `SELECT * FROM content WHERE id = ${id}`;
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
          return resolve(results[0]);
        }
        resolve(results);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };
  static fetchOriginalContent = async (id: number) => {
    const query = `SELECT c.* FROM content c JOIN documents d ON c.document_id = d.id WHERE c.p_id = 0 AND c.document_id = ${id}`;
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
          return resolve(results[0]);
        }
        resolve(results);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };

  static fetchAllContentVersion = async (id: number) => {
    const query = `SELECT * FROM content WHERE document_id = "${id}"`;
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
          return resolve(results[0]);
        }
        resolve(results);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };
}
