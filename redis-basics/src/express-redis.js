// Import express and redis libraries
const express = require('express');
const { createClient } = require('redis');

// Create express app and redis client
const app = express();
const client = createClient();

// Connect to Redis server before starting server
client.connect().then(() => console.log('Connected to Redis!')).catch(console.error);

// GET /save: Endpoint to store a key-value pair in Redis
app.get('/save', async (req, res) => {
  // Get key and value from query parameters, e.g. /save?key=user&val=Alice
  const key = req.query.key || 'demoKey';
  const val = req.query.val || 'demoValue';

  // Save key-value pair in Redis
  await client.set(key, val);
  res.json({ message: 'Saved to Redis', key, val });
});

// GET /read: Endpoint to fetch a value from Redis using a key
app.get('/read', async (req, res) => {
  const key = req.query.key || 'demoKey';

  // Retrieve value for key from Redis
  const value = await client.get(key);
  if (!value) {
    return res.status(404).json({ message: 'Key not found in Redis', key });
  }
  res.json({ message: 'Read from Redis', key, value });
});

// GET /delete: Endpoint to remove a key from Redis
app.get('/delete', async (req, res) => {
  const key = req.query.key || 'demoKey';

  // Delete key from Redis
  const count = await client.del(key);
  if (count === 0) {
    return res.status(404).json({ message: 'Key not found to delete', key });
  }
  res.json({ message: 'Deleted from Redis', key });
});

// Start Express web server on port 3000
app.listen(3000, () => {
  console.log('Express Redis server running on http://localhost:3000');
});
