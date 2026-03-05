// @ts-check

const { Router } = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/AuthController');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: secure123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email is already registered
 *       422:
 *         description: Validation errors
 */
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  validateMiddleware,
  AuthController.register
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Sign in and get a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secure123
 *     responses:
 *       200:
 *         description: Successful login, returns JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateMiddleware,
  AuthController.login
);

module.exports = router;
