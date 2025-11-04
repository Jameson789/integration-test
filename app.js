import express from 'express';
import db from './db.js'

const PORT = 3000;

const app = express(); 

app.get('/', (req, res) => res.status(200).json({ hello: 'hello world' }));

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

export function sum(a, b) {
  return a + b;
}

export default app;