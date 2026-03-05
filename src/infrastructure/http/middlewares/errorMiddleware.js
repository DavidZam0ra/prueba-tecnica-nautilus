// @ts-check

/**
 * Centralized error handler.
 * @param {Error} err
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
function errorMiddleware(err, _req, res, _next) {
  const statusMap = {
    'Invalid credentials': 401,
    'Task not found': 404,
    'You are not allowed to update this task': 403,
    'You are not allowed to delete this task': 403,
    'Email is already registered': 409,
  };
  const statusCode = statusMap[err.message] || 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  if (statusCode === 500) {
    console.error('[ERROR]', err);
  }

  res.status(statusCode).json({ message });
}

module.exports = errorMiddleware;
