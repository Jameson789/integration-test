// __tests__/example.test.js
import pkg from '@databases/mysql-test';
import mysql from 'mysql2/promise';
import { jest} from '@jest/globals'
const getDatabase = pkg.default;

let database;
let connection;

jest.setTimeout(30000);

beforeAll(async () => {
  // Start a temporary MySQL test database in Docker
  database = await getDatabase();
  process.env.DATABASE_URL = database.databaseURL;

  // Connect using mysql2
  connection = await mysql.createConnection(database.databaseURL);

  // Set up schema + seed data
  await connection.query(`
    CREATE TABLE users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255)
    )
  `);
  await connection.query('INSERT INTO users (name) VALUES (?)', ['Alice']);
});

afterAll(async () => {
  // Clean up connections and stop the container
  await connection.end();
  await database.kill();
});

test('queries the test database', async () => {
  const [rows] = await connection.query('SELECT * FROM users');
  expect(rows).toEqual([{ id: 1, name: 'Alice' }]);
});

test('verify connection is real', async () => {
  const [rows] = await connection.query('SELECT VERSION() AS version');
  console.log('MySQL version:', rows[0].version);
  expect(rows[0].version).toMatch(/^8/);
});

