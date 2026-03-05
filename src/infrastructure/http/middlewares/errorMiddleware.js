// @ts-check

/**
 * Middleware de manejo centralizado de errores.
 * Debe estar registrado al final de la cadena de middlewares en app.js.
 * @param {Error & { statusCode?: number }} err
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Error interno del servidor' : err.message;

  if (statusCode === 500) {
    console.error('[ERROR]', err);
  }

  res.status(statusCode).json({ message });
}

module.exports = errorMiddleware;
