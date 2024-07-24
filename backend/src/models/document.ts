import sql from "../configs/dbconn";
import { ResultSetHeader } from "mysql2";

export class Document {
  user_id: number;
  status: string;
  text: string;
  doc_path: string;
  p_id: number;
  name: string;

  constructor(
    user_id: number,
    status: string,
    text: string,
    doc_path: string,
    p_id: number,
    name: string
  ) {
    this.user_id = user_id;
    this.status = status;
    this.text = text;
    this.doc_path = doc_path;
    this.p_id = p_id;
    this.name = name;
  }

  async save() {
    return new Promise(async (resolve, reject) => {
      sql.db.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        connection.beginTransaction((err) => {
          if (err) {
            reject(err);
          }
          const docQuery = `INSERT INTO documents( user_id, status,doc_path, name ) VALUES (?, ?,?,?)`;
          const contQuery = `INSERT INTO content (document_id, text, p_id) VALUES (?,?,?)`;
          connection.query<ResultSetHeader>(
            docQuery,
            [this.user_id, this.status, this.doc_path, this.name],
            (err, results, fields) => {
              if (err) {
                connection.release();
                reject(err);
                return;
              }
              const docId = results.insertId;

              connection.query<ResultSetHeader>(
                contQuery,
                [docId, this.text, this.p_id],
                (err, results, fields) => {
                  if (err) {
                    connection.rollback(() => {
                      connection.release();
                      reject(err);
                    });
                  }
                  connection.commit((error) => {
                    if (error) {
                      connection.rollback(() => {
                        connection.release();
                        reject(error);
                      });
                    }
                    connection.release();

                    resolve(results.insertId);
                  });
                }
              );
            }
          );
        });
      });
    });
  }

  static archiveDocument = async (id: string) => {
    const query = `UPDATE documents SET status = 'archived' WHERE id = "${id}"`;
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

  static findUserDocuments = async (id: number) => {
    const query = `SELECT u.id, u.username, d.* FROM users u JOIN documents d ON u.id = d.user_id  WHERE u.id = ${id}`;
    return new Promise((resolve, reject) => {
      sql.db.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (Array.isArray(results) && results.length === 0) {
          return resolve(false);
        }
        resolve(results);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };

  static getDocument = async (id: number) => {
    const query = `SELECT d.*, c.*
    FROM documents d
    JOIN content c ON d._id = c.document_id
    WHERE d.id = ${id};
`;
    return new Promise((resolve, reject) => {
      sql.db.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (Array.isArray(results) && results.length === 0) {
          return resolve(false);
        }
        resolve(results);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };

  static fetchAllDocumentVersions = async (id: number) => {
    const query = `SELECT 
    c.id AS cont_id,
    c.text AS text,
    c.p_id AS p_id,
    c.created_at AS date,
    d.id AS doc_id,
    d.upload_date,
    d.name AS name,
    u.id AS user_id,
    u.username AS username
    FROM 
    content c
    LEFT JOIN 
    documents d ON c.document_id = d.id
    LEFT JOIN 
    users u ON d.user_id = u.id
    WHERE 
    c.document_id = "${id}"
`;
    return new Promise((resolve, reject) => {
      sql.db.query(query, (err, results) => {
        if (err) {
          reject(err);
        }
        if (Array.isArray(results)) {
          resolve(results);
        }
        resolve([results]);
      });
    }).catch((err) => {
      const error = { code: err.code, failed: true, message: err.sqlMessage };
      return error;
    });
  };
}
