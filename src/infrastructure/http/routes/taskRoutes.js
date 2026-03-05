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
 *   description: Gestión de tareas
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
 *     summary: Listar todas las tareas del usuario autenticado
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: No autenticado
 */
router.get('/', authMiddleware, TaskController.list);

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
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
 *                 example: Configurar servidor
 *               description:
 *                 type: string
 *                 example: Instalar y configurar Nginx
 *               responsible:
 *                 type: string
 *                 example: Carlos López
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: No autenticado
 *       422:
 *         description: Errores de validación
 */
router.post(
  '/',
  authMiddleware,
  [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('responsible').notEmpty().withMessage('El responsable es obligatorio'),
  ],
  validateMiddleware,
  TaskController.create
);

/**
 * @openapi
 * /api/tasks/{id}/complete:
 *   patch:
 *     summary: Marcar una tarea como completada
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Sin permiso para modificar esta tarea
 *       404:
 *         description: Tarea no encontrada
 */
router.patch('/:id/complete', authMiddleware, TaskController.complete);

/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       204:
 *         description: Tarea eliminada correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Sin permiso para eliminar esta tarea
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', authMiddleware, TaskController.delete);

module.exports = router;
