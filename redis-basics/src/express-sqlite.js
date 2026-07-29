// Import express framework and better-sqlite3
const express = require('express');
const Database = require('better-sqlite3');

// Initialize express app and database connection
const app = express();
const db = new Database('students.db');

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Initialize SQLite table for students
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`);

// CREATE: Endpoint to insert a new student
app.post('/students', (req, res) => {
  const { name, age } = req.body;
  const stmt = db.prepare('INSERT INTO students (name, age) VALUES (?, ?)');
  const result = stmt.run(name, age);
  res.status(201).json({ id: result.lastInsertRowid, name, age });
});

// READ ALL: Endpoint to get all students from database
app.get('/students', (req, res) => {
  const students = db.prepare('SELECT * FROM students').all();
  res.json(students);
});

// READ ONE: Endpoint to get single student by ID
app.get('/students/:id', (req, res) => {
  const student = db.prepare('SELECT * FROM students WHERE id = ?').get(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

// UPDATE: Endpoint to update student by ID
app.put('/students/:id', (req, res) => {
  const { name, age } = req.body;
  const stmt = db.prepare('UPDATE students SET name = ?, age = ? WHERE id = ?');
  const result = stmt.run(name, age, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Student not found' });
  res.json({ id: Number(req.params.id), name, age });
});

// DELETE: Endpoint to delete student by ID
app.delete('/students/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM students WHERE id = ?');
  const result = stmt.run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Student not found' });
  res.json({ message: 'Student deleted successfully' });
});

// Start the Express web server on port 3000
app.listen(3000, () => {
  console.log('Express SQLite server running on http://localhost:3000');
});
