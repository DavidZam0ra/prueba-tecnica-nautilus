// @ts-check

const { Router } = require('express');
const { body } = require('express-validator');
const TaskController = require('../controllers/TaskController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         responsible:
 *           type: string
 *         completed:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         ownerId:
 *           type: string
 */

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: List all tasks for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Task list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Not authenticated
 */
router.get('/', authMiddleware, TaskController.list);

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, responsible]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Configure server
 *               description:
 *                 type: string
 *                 example: Install and configure Nginx
 *               responsible:
 *                 type: string
 *                 example: Alex Johnson
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Not authenticated
 *       422:
 *         description: Validation errors
 */
router.post(
  '/',
  authMiddleware,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('responsible').notEmpty().withMessage('Responsible is required'),
  ],
  validateMiddleware,
  TaskController.create
);

/**
 * @openapi
 * /api/tasks/{id}/complete:
 *   patch:
 *     summary: Mark a task as completed
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not allowed to update this task
 *       404:
 *         description: Task not found
 */
router.patch('/:id/complete', authMiddleware, TaskController.complete);

/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not allowed to delete this task
 *       404:
 *         description: Task not found
 */
router.delete('/:id', authMiddleware, TaskController.delete);

module.exports = router;
