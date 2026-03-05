// @ts-check

const Task = require('../../domain/entities/Task');
const TaskRepository = require('../../domain/repositories/TaskRepository');

/**
 * Caso de uso: Marcar una tarea como completada.
 */
class CompleteTaskUseCase {
  /**
   * @param {TaskRepository} taskRepository
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Marca la tarea indicada como completada.
   * Solo el propietario puede completar su propia tarea.
   * @param {string} taskId
   * @param {string} ownerId
   * @returns {Promise<Task>}
   */
  async execute(taskId, ownerId) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      const error = new Error('Tarea no encontrada');
      // @ts-ignore
      error.statusCode = 404;
      throw error;
    }

    if (task.ownerId !== ownerId) {
      const error = new Error('No tienes permiso para modificar esta tarea');
      // @ts-ignore
      error.statusCode = 403;
      throw error;
    }

    const completedTask = task.complete();
    return this.taskRepository.update(completedTask);
  }
}

module.exports = CompleteTaskUseCase;
