import { createClient } from "redis";

// Create Redis client instance
const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

// Redis error handling
redisClient.on("error", (err) => {
  console.log("Redis Client Error:", err.message);
});

// Connect to Redis server
export async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Connected to Redis successfully!");
  } catch (error) {
    console.log("Failed to connect to Redis. Running without active Redis cache.");
  }
}

export default redisClient;
