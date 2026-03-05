// @ts-check

const jwt = require('jsonwebtoken');

/**
 * @typedef {Object} JwtPayload
 * @property {string} userId
 * @property {string} email
 */

/**
 * Verifies JWT from the Authorization header.
 * If valid, it appends `user` to the request object.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const payload = /** @type {JwtPayload} */ (jwt.verify(token, secret));
    /** @type {import('express').Request & { user: JwtPayload }} */ (req).user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
}

module.exports = authMiddleware;
