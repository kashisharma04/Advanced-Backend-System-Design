import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// Function to initialize SQLite database and auto-seed sample records
export async function initDatabase() {
  // Open SQLite database file (students.db)
  const db = await open({
    filename: path.join(".", "students.db"),
    driver: sqlite3.Database
  });

  // Create students table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      course TEXT NOT NULL
    )
  `);

  // Check if students table is empty
  const countResult = await db.get("SELECT COUNT(*) as count FROM students");

  // Automatically insert 10 sample records if database is freshly created
  if (countResult.count === 0) {
    console.log("Seeding 10 sample student records...");
    const sampleStudents = [
      { name: "Alice Smith", email: "alice@example.com", course: "Computer Science" },
      { name: "Bob Johnson", email: "bob@example.com", course: "Information Technology" },
      { name: "Charlie Brown", email: "charlie@example.com", course: "Data Science" },
      { name: "Diana Prince", email: "diana@example.com", course: "Cyber Security" },
      { name: "Evan Wright", email: "evan@example.com", course: "Artificial Intelligence" },
      { name: "Fiona Gallagher", email: "fiona@example.com", course: "Computer Science" },
      { name: "George Clark", email: "george@example.com", course: "Software Engineering" },
      { name: "Hannah Abbott", email: "hannah@example.com", course: "Information Technology" },
      { name: "Ian Malcolm", email: "ian@example.com", course: "Data Science" },
      { name: "Julia Roberts", email: "julia@example.com", course: "Computer Science" }
    ];

    for (const student of sampleStudents) {
      await db.run(
        "INSERT INTO students (name, email, course) VALUES (?, ?, ?)",
        [student.name, student.email, student.course]
      );
    }
    console.log("Sample students inserted successfully!");
  }

  return db;
}
