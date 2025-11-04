import mysql from 'mysql2/promise'
import Database from 'better-sqlite3';

let db;

if (process.env.NODE_ENV === 'test') {
  // In-memory SQLite for tests
  const sqlite = new Database(':memory:');

  // Example schema setup
  sqlite.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );
  `);

  db = {
    async query(sql, params = []) {
      const stmt = sqlite.prepare(sql);
      if (sql.trim().toLowerCase().startsWith('select')) {
        return [stmt.all(params)];
      } else {
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
