import express from 'express';
const PORT = 3000;

const app = express(); 

app.get('/', (req, res) => res.status(200).json({ hello: 'hello world' }));


app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});