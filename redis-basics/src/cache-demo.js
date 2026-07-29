// Import required packages
const express = require('express');
const Database = require('better-sqlite3');
const { createClient } = require('redis');

const app = express();
const db = new Database('students.db');
const redisClient = createClient();

app.use(express.json());

// Initialize SQLite table and connect to Redis
db.exec('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)');
redisClient.connect().then(() => console.log('Redis connected for Cache Demo!'));

// GET /students: Cached endpoint using Redis
app.get('/students', async (req, res) => {
  const cacheKey = 'students:all';

  // 1. Check Redis cache first
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    // CACHE HIT: Return cached data from Redis
    console.log('Cache Hit: Returning data from Redis');
    return res.json({ source: 'cache (Redis)', data: JSON.parse(cachedData) });
  }

  // 2. CACHE MISS: Read data from SQLite database
  console.log('Cache Miss: Reading data from SQLite');
  const students = db.prepare('SELECT * FROM students').all();

  // 3. Store database result in Redis with an expiration of 60 seconds
  await redisClient.set(cacheKey, JSON.stringify(students), { EX: 60 });

  // 4. Return data fetched from database
  res.json({ source: 'database (SQLite)', data: students });
});

// POST /students: Add student and clear cache
app.post('/students', async (req, res) => {
  const { name, age } = req.body;
  const stmt = db.prepare('INSERT INTO students (name, age) VALUES (?, ?)');
  const result = stmt.run(name, age);

  // Clear Redis cache so fresh data will be fetched on next GET request
  await redisClient.del('students:all');
  console.log('Cache cleared after POST');

  res.status(201).json({ id: result.lastInsertRowid, name, age });
});

// DELETE /students/:id: Delete student and clear cache
app.delete('/students/:id', async (req, res) => {
  db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id);

  // Clear Redis cache on data modification
  await redisClient.del('students:all');
  console.log('Cache cleared after DELETE');

  res.json({ message: 'Student deleted and cache invalidated' });
});

app.listen(3000, () => console.log('Cache demo running on http://localhost:3000'));
