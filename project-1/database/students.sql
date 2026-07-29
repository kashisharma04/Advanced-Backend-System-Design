-- ==========================================
-- Student Management Database
-- SQLite Schema + Sample Data
-- ==========================================

-- Drop table if it already exists
DROP TABLE IF EXISTS students;

-- Create students table
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    course TEXT NOT NULL
);

-- Insert Sample Data

INSERT INTO students (name, email, course) VALUES
('Alice Johnson', 'alice@gmail.com', 'Node.js'),
('Bob Smith', 'bob@gmail.com', 'React'),
('Charlie Brown', 'charlie@gmail.com', 'Python'),
('David Wilson', 'david@gmail.com', 'Java'),
('Emma Davis', 'emma@gmail.com', 'Flutter'),
('Frank Miller', 'frank@gmail.com', 'MERN Stack'),
('Grace Lee', 'grace@gmail.com', 'Angular'),
('Henry Clark', 'henry@gmail.com', 'DevOps'),
('Isabella Thomas', 'isabella@gmail.com', 'Data Science'),
('Jack Anderson', 'jack@gmail.com', 'Cyber Security');

-- Verify Data
SELECT * FROM students;