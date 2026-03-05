// @ts-check

const { validationResult } = require('express-validator');

/**
 * Checks express-validator results.
 * Returns 422 with validation details when errors are present.
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
