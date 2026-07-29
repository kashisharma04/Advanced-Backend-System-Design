import express from "express";
import cron from "node-cron";
import "dotenv/config";

import { initDatabase } from "./database.js";
import { connectRedis } from "./redis.js";
import { loggerMiddleware } from "./middleware/logger.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Redis & Initialize SQLite
await connectRedis();
const db = await initDatabase();

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// Attach db instance to req object for easy route access
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Cron Job: Run every minute
cron.schedule("* * * * *", () => {
  console.log("Checking attendance...");
});

// API Routes
app.use("/", routes);

// Error Middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
