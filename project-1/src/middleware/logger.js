// Simple middleware to log incoming requests
export function loggerMiddleware(req, res, next) {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
}
