import mysql from 'mysql2/promise'
import Database from 'better-sqlite3';

let db;

if (process.env.NODE_ENV === 'test') {
  // In-memory SQLite for tests
  const sqlite = new Database(':memory:');

  // Example schema setup
  // Consider adding .exec method to db wrapper
  sqlite.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );
  `);
  // wrapper db object to mimic mysql2 behavior using sqlite
  db = {
    // methods are async only to match the mysql2 method behavior
    async query(sql, params = []) {
      // turn sql string into sqlite Statement object
      const stmt = sqlite.prepare(sql);

      // check what kind of query it is to determine expected output
      if (sql.trim().toLowerCase().startsWith('select')) {
        // retrieves all rows matching the query as an array
        return [stmt.all(params)];
      } else {
        // If it's not selecting/reading then its changing data.
        // this method runs the statement and returns the number of rows changed, and the last row inserted.
        const info = stmt.run(params);
        return [{ insertId: info.lastInsertRowid, changes: info.changes }];
      }
    },
    async end() {
      sqlite.close();
    },
  };
} else {
  // Real MySQL in dev/prod
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
}

export default db;
