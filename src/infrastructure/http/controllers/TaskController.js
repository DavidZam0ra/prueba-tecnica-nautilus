// @ts-check

const CreateTaskUseCase = require('../../../application/task/CreateTaskUseCase');
const ListTasksUseCase = require('../../../application/task/ListTasksUseCase');
const CompleteTaskUseCase = require('../../../application/task/CompleteTaskUseCase');
const DeleteTaskUseCase = require('../../../application/task/DeleteTaskUseCase');
const MongoTaskRepository = require('../../database/mongodb/repositories/MongoTaskRepository');

const taskRepository = new MongoTaskRepository();

/**
 * Controlador HTTP para los endpoints de tareas.
 * Todos los endpoints requieren autenticación previa (authMiddleware).
 */
const TaskController = {
  /**
   * POST /api/tasks
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const { title, description, responsible } = req.body;
      // @ts-ignore
      const ownerId = req.user.userId;
      const useCase = new CreateTaskUseCase(taskRepository);
      const task = await useCase.execute({ title, description, responsible, ownerId });
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /api/tasks
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async list(req, res, next) {
    try {
      // @ts-ignore
      const ownerId = req.user.userId;
      const useCase = new ListTasksUseCase(taskRepository);
      const tasks = await useCase.execute(ownerId);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  },

  /**
   * PATCH /api/tasks/:id/complete
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async complete(req, res, next) {
    try {
      const { id } = req.params;
      // @ts-ignore
      const ownerId = req.user.userId;
      const useCase = new CompleteTaskUseCase(taskRepository);
      const task = await useCase.execute(id, ownerId);
      res.json(task);
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /api/tasks/:id
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      // @ts-ignore
      const ownerId = req.user.userId;
      const useCase = new DeleteTaskUseCase(taskRepository);
      await useCase.execute(id, ownerId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = TaskController;
