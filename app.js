import express from 'express';
import db from './db.js';
const PORT = 3000;

const app = express(); 

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ hello: 'hello world' }));

app.get('/users', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM users');
  res.status(200).json(rows);
});

app.post('/users', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name]);
  res.status(201).json({ id: result.insertId, name });
});

if (process.env.NODE_ENV !== 'test'){
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
  });
}


export function sum(a, b) {
  return a + b;
}

export default app;