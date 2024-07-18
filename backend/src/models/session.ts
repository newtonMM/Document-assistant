import session from "express-session";
import sql from "../configs/dbconn";

interface MySqlResult {
  rows: { cookie: string }[];
}

class SessionStore extends session.Store {
  constructor() {
    super();
    // Initialize the database connection
  }

  get(
    sid: string,
    callback: (err: any, session?: session.SessionData | null) => void
  ) {
    const query = "SELECT * FROM sessions WHERE sid = ?";
    sql.query(query, [sid], (err: any, result: MySqlResult) => {
      if (err) return callback(err);
      if (result.rows.length === 0) return callback(null, null);
      try {
        const session = JSON.parse(result.rows[0].cookie);
        return callback(null, session);
      } catch (e) {
        return callback(e);
      }
    });
  }

  set(
    sid: string,
    session: session.SessionData,
    callback: (err?: any) => void
  ) {
    const query =
      "REPLACE INTO sessions(sid, token, cookie, userId,lifetime, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?,?)";
    const { token, userId, lifetime, startTime, endTime } = session as any;
    const cookie = JSON.stringify(session);

    sql.query(
      query,
      [sid, token, cookie, userId, lifetime, startTime, endTime],
      (err: any) => {
        if (err) return callback(err);
        return callback(null);
      }
    );
  }

  destroy(sid: string, callback: (err?: any) => void) {
    const query = "DELETE FROM sessions WHERE sid = ?";
    sql.query(query, [sid], (err: any) => {
      if (err) {
        console.log(err);
        return callback(err);
      }
      return callback(null);
    });
  }
}

export default new SessionStore();
