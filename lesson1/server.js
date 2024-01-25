const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 3000;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

pool.query(`
  CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
  );
`, (err, result) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created or already exists.');
  }
});

app.get('/api/todos', async (req, res) => {
  try {
    const { page } = req.query;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const countResult = await pool.query('SELECT COUNT(*) FROM todos');
    const totalCount = parseInt(countResult.rows[0].count, 10);

    const totalPages = Math.ceil(totalCount / pageSize);

    const result = await pool.query('SELECT * FROM todos ORDER BY id ASC LIMIT $1 OFFSET $2', [pageSize, offset]);
    res.json({ todos: result.rows, totalPages });
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await pool.query('INSERT INTO todos (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await pool.query('UPDATE todos SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/todos-by-name/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const result = await pool.query('SELECT * FROM todos WHERE name = $1', [name]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching todos by name:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});