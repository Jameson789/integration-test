# What is integration testing?
Integration testing is when we test how individual modules or components of the project work together.

## How are we doing integration testing?
- Using Jest and SuperTest we were able to do integration testing on our API making sure that all of the routes work how they are meant to.
- We used a library called `databases/mysql-test` that utilizes docker to create temporary lightweight MySQL databases, cutting down on the amount of mocking that is necessary.

## Troubles we ran into:
- 'NODE_OPTIONS' is not recognized as an internal or external command was one error we ran into, trying to inject ENV variables meant we had to consider cross compatibility.
  - Using cross env we were able to just add it in front of the command script we were running.
 
## Steps we took:
1. Install Jest and Supertest.
2. Edit scrips in the package.json to run the tests

```
"test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest",
```
   
4. Add this below to your package.json

```
  "jest": {
    "testEnvironment": "node",
    "transform": {}
  }

```
  
6. Run a sanity check test to make sure you have everything installed properly.

## How we tested against a database:
### Testing with In-Memory SQLite

For quick, isolated tests, we use **SQLite** in memory. This allows tests to run fast without needing a real database.

- Setup happens automatically when `NODE_ENV` is `test`.
- Provides a `db.query(sql, params)` method similar to MySQL.
- Supports `SELECT` queries (returns results) and `INSERT/UPDATE/DELETE` (returns `insertId` and `changes`).


### Testing with Temporary MySQL
For more realistic tests, we use `@database/mysql-test` to spin up a temporary MySQL database in Docker.
- Each test gets a fresh database.
- Use `mysql2/promise` to connect and run queries.
- Each database is automatically cleaned up after all the tests finish running.

