// @ts-check

const { validationResult } = require('express-validator');

/**
 * Middleware que comprueba el resultado de las validaciones de express-validator.
 * Si hay errores, responde con 422 y los detalles. De lo contrario, continúa.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function validateMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

module.exports = validateMiddleware;
