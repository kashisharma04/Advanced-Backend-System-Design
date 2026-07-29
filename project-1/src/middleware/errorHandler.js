// 404 Not Found Middleware
export function notFoundHandler(req, res, next) {
  res.status(404).json({ error: "404 Not Found" });
}

// Global 500 Internal Server Error Middleware
export function errorHandler(err, req, res, next) {
  console.log("Errors:", err.message || err);
  res.status(500).json({ error: "500 Internal Server Error", details: err.message });
}
