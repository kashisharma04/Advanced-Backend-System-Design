// Redis is an in-memory database used mainly for caching, session storage, counters, queues, and fast data access.
// Redis stores: KEY → VALUE
// Redis Download: https://github.com/microsoftarchive/redis/releases?utm_source=chatgpt.com

// Command	Purpose	Example
// SET	:- Store a value	SET 
// GET :- Read a value	GET 
// DEL :-	Delete a key	DEL
// EXISTS	:- Check if a key exists	EXISTS 
// SET ... EX	:-Store with expiry

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



// Example-2
// Store OTP for 30 seconds
await client.set("otp", "123456", {
    EX: 30
});

// Read OTP
const otp = await client.get("otp");
console.log(otp);




// Product cache example code - 2
async function main(){

    await client.connect();

    const product = {
        name:"Laptop",
        price:50000
    };


    await client.set(
        "product:1",
        JSON.stringify(product)
    );


    const data = await client.get("product:1");


    console.log(JSON.parse(data));


    await client.quit();
}

main();

// User session code-3:
async function main(){

    await client.connect();

    await client.set(
        "session:user101",
        "logged_in"
    );

    const session = await client.get(
        "session:user101"
    );

    console.log(session);

    await client.quit();
}

main();