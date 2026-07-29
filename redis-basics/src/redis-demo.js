// Import the redis library
const { createClient } = require('redis');

async function main() {
  // 1. Create a Redis client connected to default localhost:6379
  const client = createClient();

  // Log error if Redis connection fails
  client.on('error', (err) => console.log('Redis Error:', err));

  // 2. Connect to the Redis server
  await client.connect();
  console.log('Connected to Redis server!');

  // 3. SET: Store a key-value pair in Redis
  await client.set('user:name', 'Alice');
  console.log('SET: user:name -> Alice');

  // 4. GET: Retrieve the value of the key from Redis
  const name = await client.get('user:name');
  console.log('GET: user:name ->', name);

  // 5. UPDATE: Overwrite the value for the same key
  await client.set('user:name', 'Bob');
  console.log('UPDATE: user:name -> Bob');

  // Fetch updated value to confirm update
  const updatedName = await client.get('user:name');
  console.log('GET updated value:', updatedName);

  // 6. DELETE: Remove the key from Redis
  await client.del('user:name');
  console.log('DELETE: user:name deleted');

  // Verify deletion by trying to get the deleted key
  const deletedValue = await client.get('user:name');
  console.log('GET after delete:', deletedValue); // Output will be null

  // 7. Close the Redis connection
  await client.quit();
  console.log('Redis connection closed.');
}

// Run the main function
main();
