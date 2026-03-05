// @ts-check

const jwt = require('jsonwebtoken');

/**
 * @typedef {Object} JwtPayload
 * @property {string} userId
 * @property {string} email
 */

/**
 * Middleware que verifica el token JWT presente en la cabecera Authorization.
 * Si el token es válido, añade `req.user` con el payload decodificado.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const payload = /** @type {JwtPayload} */ (jwt.verify(token, secret));
    // @ts-ignore — extendemos req con el usuario autenticado
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;
