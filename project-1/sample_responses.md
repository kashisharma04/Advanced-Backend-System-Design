# Sample API Requests and Responses

This document contains sample HTTP requests and expected JSON responses for the Student Management API.

---

## 1. GET /students (Cache Miss - First Request)
- **Response Time**: ~3 seconds (Demonstrating DB read delay)
- **Console Log**: `Cache Miss`
- **Response**:
```json
[
  { "id": 1, "name": "Alice Smith", "email": "alice@example.com", "course": "Computer Science" },
  { "id": 2, "name": "Bob Johnson", "email": "bob@example.com", "course": "Information Technology" },
  { "id": 3, "name": "Charlie Brown", "email": "charlie@example.com", "course": "Data Science" },
  { "id": 4, "name": "Diana Prince", "email": "diana@example.com", "course": "Cyber Security" },
  { "id": 5, "name": "Evan Wright", "email": "evan@example.com", "course": "Artificial Intelligence" },
  { "id": 6, "name": "Fiona Gallagher", "email": "fiona@example.com", "course": "Computer Science" },
  { "id": 7, "name": "George Clark", "email": "george@example.com", "course": "Software Engineering" },
  { "id": 8, "name": "Hannah Abbott", "email": "hannah@example.com", "course": "Information Technology" },
  { "id": 9, "name": "Ian Malcolm", "email": "ian@example.com", "course": "Data Science" },
  { "id": 10, "name": "Julia Roberts", "email": "julia@example.com", "course": "Computer Science" }
]
```

## 2. GET /students (Cache Hit - Second Request within 60s)
- **Response Time**: ~5 ms
- **Console Log**: `Cache Hit`
- **Response**: Same JSON payload as above returned instantly from Redis.

---

## 3. GET /students/1
- **Response**:
```json
{
  "id": 1,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "course": "Computer Science"
}
```

---

## 4. POST /students
- **Request Body**:
```json
{
  "name": "Kevin Peterson",
  "email": "kevin@example.com",
  "course": "Cloud Computing"
}
```
- **Console Log**: `Student Created`
- **Status Code**: `201 Created`
- **Response**:
```json
{
  "id": 11,
  "name": "Kevin Peterson",
  "email": "kevin@example.com",
  "course": "Cloud Computing"
}
```

---

## 5. PUT /students/1
- **Request Body**:
```json
{
  "name": "Alice Cooper",
  "email": "alice.cooper@example.com",
  "course": "Computer Science Engineering"
}
```
- **Console Log**: `Student Updated`
- **Response**:
```json
{
  "id": 1,
  "name": "Alice Cooper",
  "email": "alice.cooper@example.com",
  "course": "Computer Science Engineering"
}
```

---

## 6. DELETE /students/10
- **Console Log**: `Student Deleted`
- **Response**:
```json
{
  "message": "Student deleted successfully"
}
```

---

## 7. GET /redis-demo
- **Response**:
```json
{
  "storedValue": "Hello Redis",
  "message": "Key set, read, and deleted successfully from Redis!"
}
```

---

## 8. POST /login
- **Request Body**:
```json
{
  "email": "student@email.com"
}
```
- **Response**:
```json
{
  "sessionId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "message": "Login successful. Session expires in 2 minutes."
}
```

---

## 9. GET /profile
- **Request Header**: `x-session-id: a1b2c3d4-e5f6-7890-abcd-ef1234567890`
- **Response**:
```json
{
  "profile": {
    "email": "student@email.com"
  }
}
```

---

## 10. POST /send-email
- **Response**:
```json
{
  "message": "Email queued"
}
```
- **Console Output (after 5 seconds)**: `Email Sent Successfully`
