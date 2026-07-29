// Import better-sqlite3 database package
const Database = require('better-sqlite3');

// 1. Create or open the SQLite database file named 'students.db'
const db = new Database('students.db');
console.log('Opened database students.db');

// 2. Create 'students' table if it does not already exist
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`);
console.log('Students table created or ready.');

// 3. INSERT: Insert a new student record into the database
const insertStmt = db.prepare('INSERT INTO students (name, age) VALUES (?, ?)');
const info = insertStmt.run('John Doe', 20);
const studentId = info.lastInsertRowid;
console.log(`Inserted student with ID: ${studentId}`);

// 4. READ: Retrieve and print all students from database
const readStmt = db.prepare('SELECT * FROM students');
const allStudents = readStmt.all();
console.log('All Students:', allStudents);

// 5. UPDATE: Change the student name and age using student ID
const updateStmt = db.prepare('UPDATE students SET name = ?, age = ? WHERE id = ?');
updateStmt.run('John Smith', 21, studentId);
console.log(`Updated student ID ${studentId} to John Smith, age 21`);

// Read students after update to show change
console.log('Students after UPDATE:', readStmt.all());

// 6. DELETE: Remove the student from database using student ID
const deleteStmt = db.prepare('DELETE FROM students WHERE id = ?');
deleteStmt.run(studentId);
console.log(`Deleted student ID: ${studentId}`);

// Read students after delete to show table is empty/updated
console.log('Students after DELETE:', readStmt.all());

// 7. Close the database connection
db.close();
console.log('Database connection closed.');
