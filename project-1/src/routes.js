import express from "express";
import { v4 as uuidv4 } from "uuid";
import redisClient from "./redis.js";

const router = express.Router();

// Helper to safely invalidate student list cache from Redis
async function clearStudentsCache() {
  try {
    if (redisClient.isOpen) {
      await redisClient.del("students_list");
    }
  } catch (err) {
    console.log("Redis cache deletion error:", err.message);
  }
}

// 1. GET /students - API Caching & 3-second delay demo
router.get("/students", async (req, res, next) => {
  try {
    const db = req.db;
    const cacheKey = "students_list";

    // Step 1: Check Redis first
    if (redisClient.isOpen) {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Cache Hit");
        return res.json(JSON.parse(cachedData));
      }
    }

    // Step 2: Cache Miss - simulate 3-second artificial delay before DB read
    console.log("Cache Miss");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Step 3: Read students from SQLite
    const students = await db.all("SELECT * FROM students");

    // Step 4: Save result in Redis for 60 seconds
    if (redisClient.isOpen) {
      await redisClient.set(cacheKey, JSON.stringify(students), { EX: 60 });
    }

    res.json(students);
  } catch (error) {
    next(error);
  }
});

// 2. GET /students/:id - Fetch single student by ID
router.get("/students/:id", async (req, res, next) => {
  try {
    const student = await req.db.get("SELECT * FROM students WHERE id = ?", [req.params.id]);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// 3. POST /students - Create new student & invalidate Redis cache
router.post("/students", async (req, res, next) => {
  try {
    const { name, email, course } = req.body;
    if (!name || !email || !course) {
      return res.status(400).json({ error: "name, email, and course are required" });
    }

    const result = await req.db.run(
      "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
      [name, email, course]
    );

    await clearStudentsCache();
    console.log("Student Created");

    res.status(201).json({ id: result.lastID, name, email, course });
  } catch (error) {
    next(error);
  }
});

// 4. PUT /students/:id - Update student & invalidate Redis cache
router.put("/students/:id", async (req, res, next) => {
  try {
    const { name, email, course } = req.body;
    const { id } = req.params;

    const existing = await req.db.get("SELECT * FROM students WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ error: "Student not found" });
    }

    await req.db.run(
      "UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?",
      [name || existing.name, email || existing.email, course || existing.course, id]
    );

    await clearStudentsCache();
    console.log("Student Updated");

    res.json({ id: Number(id), name: name || existing.name, email: email || existing.email, course: course || existing.course });
  } catch (error) {
    next(error);
  }
});

// 5. DELETE /students/:id - Delete student & invalidate Redis cache
router.delete("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await req.db.get("SELECT * FROM students WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ error: "Student not found" });
    }

    await req.db.run("DELETE FROM students WHERE id = ?", [id]);
    await clearStudentsCache();
    console.log("Student Deleted");

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// 6. GET /redis-demo - Basic Redis set, get, delete demonstration
router.get("/redis-demo", async (req, res, next) => {
  try {
    if (!redisClient.isOpen) {
      return res.status(500).json({ error: "Redis is not connected" });
    }

    // Store key
    await redisClient.set("message", "Hello Redis");
    // Read key
    const val = await redisClient.get("message");
    // Delete key
    await redisClient.del("message");

    res.json({
      storedValue: val,
      message: "Key set, read, and deleted successfully from Redis!"
    });
  } catch (error) {
    next(error);
  }
});

// 7. POST /login - Session management demo (Store email in Redis for 2 mins)
router.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const sessionId = uuidv4();
    if (redisClient.isOpen) {
      // Expire session after 2 minutes (120 seconds)
      await redisClient.set(`session:${sessionId}`, JSON.stringify({ email }), { EX: 120 });
    }

    res.json({ sessionId, message: "Login successful. Session expires in 2 minutes." });
  } catch (error) {
    next(error);
  }
});

// 8. GET /profile - Session retrieval demo
router.get("/profile", async (req, res, next) => {
  try {
    const sessionId = req.headers["x-session-id"] || req.query.sessionId;
    if (!sessionId) {
      return res.status(400).json({ error: "Session ID required (provide x-session-id header or sessionId query)" });
    }

    if (!redisClient.isOpen) {
      return res.status(500).json({ error: "Redis is not connected" });
    }

    const sessionData = await redisClient.get(`session:${sessionId}`);
    if (!sessionData) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    res.json({ profile: JSON.parse(sessionData) });
  } catch (error) {
    next(error);
  }
});

// 9. POST /send-email - Asynchronous processing demonstration
router.post("/send-email", (req, res) => {
  // Immediately return response
  res.json({ message: "Email queued" });

  // Asynchronous task executes 5 seconds later
  setTimeout(() => {
    console.log("Email Sent Successfully");
  }, 5000);
});

export default router;
