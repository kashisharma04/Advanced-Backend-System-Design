import { createClient } from "redis";

const redis = createClient();

redis.on("error", err => {
    console.log("Redis Error:", err.message);
});

await redis.connect();

console.log("Connected to Redis");

// Store data
await redis.set("course", "Node.js");

// Read data
const course = await redis.get("course");

console.log("Course:", course);

// Delete data
await redis.del("course");

console.log("Key Deleted");

await redis.quit();