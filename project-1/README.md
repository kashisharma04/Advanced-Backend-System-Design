# Student Management API

A simple, clean, and beginner-friendly Node.js backend using **Express.js**, **SQLite**, and **Redis**.

## Features

- **Express CRUD**: Full student record management (`GET`, `POST`, `PUT`, `DELETE`).
- **SQLite Database**: Auto-created `students.db` with 10 sample records on initial startup.
- **Redis Basics & Demo**: Simple endpoint demonstrating setting, reading, and deleting a key (`GET /redis-demo`).
- **API Caching**: Cache `GET /students` responses in Redis for 60 seconds with cache invalidation on mutation endpoints.
- **Performance Demo**: 3-second artificial delay on Cache Miss vs instantaneous Cache Hit response.
- **Session Management**: Generate session IDs stored in Redis expiring after 2 minutes (`POST /login` & `GET /profile`).
- **Asynchronous Processing**: Non-blocking email queueing endpoint (`POST /send-email`).
- **Event Loop Demo**: Demonstrating synchronous vs asynchronous JavaScript call stack execution order.
- **Cron Jobs**: `node-cron` scheduled task running every minute printing "Checking attendance...".
- **Simple Logging**: Native `console.log()` logging.
- **Global Error Handling**: Centralized 404 & 500 JSON error handling middleware.

---

## Folder Structure

```text
src/
│── app.js                 # Entry point (Express app & cron job setup)
│── database.js            # SQLite database initialization & sample data seeding
│── redis.js               # Redis client connection setup
│── routes.js              # Express API routes
│── eventLoop.js           # Event Loop execution order demonstration
│── middleware/
│   ├── logger.js          # Incoming request logger middleware
│   └── errorHandler.js    # Global 404 and 500 error handling middleware
.env.example               # Environment variable examples
package.json               # Dependencies & scripts configuration
README.md                  # Project documentation
sample_responses.md        # API response documentation
postman_collection.json    # Exported Postman collection
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Redis Server](https://redis.io/) running locally or accessible via URL.

### Installation

1. Clone or download the project files.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment settings:
   ```bash
   cp .env.example .env
   ```

### Running the Application

Start the server:
```bash
npm start
```
The server will start at `http://localhost:3000`. SQLite (`students.db`) will be automatically created and populated with 10 initial student records.

Run the Event Loop demo script:
```bash
npm run event-loop
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/students` | Get all students (Uses Redis cache for 60s, 3s delay on Cache Miss) |
| `GET` | `/students/:id` | Get single student by ID |
| `POST` | `/students` | Add a new student (Clears Redis cache) |
| `PUT` | `/students/:id` | Update student details (Clears Redis cache) |
| `DELETE` | `/students/:id` | Delete student (Clears Redis cache) |
| `GET` | `/redis-demo` | Store "Hello Redis", read it, delete key, return JSON |
| `POST` | `/login` | Generate session ID in Redis for 2 minutes |
| `GET` | `/profile` | Retrieve session info from Redis using session ID |
| `POST` | `/send-email` | Queue email (Returns instantly, logs after 5s) |

---

## Event Loop Concept

Run `npm run event-loop` to observe execution order:
1. `console.log("Start")` prints first.
2. `console.log("End")` prints second.
3. `console.log("Timer")` prints last because `setTimeout` callback goes to the Macrotask Queue and runs after synchronous execution finishes.
