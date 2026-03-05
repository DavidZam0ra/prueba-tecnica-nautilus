// @ts-check

const TaskRepository = require('../../domain/repositories/TaskRepository');

/**
 * Caso de uso: Eliminar una tarea.
 */
class DeleteTaskUseCase {
  /**
   * @param {TaskRepository} taskRepository
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Elimina la tarea indicada. Solo el propietario puede eliminarla.
   * @param {string} taskId
   * @param {string} ownerId
   * @returns {Promise<void>}
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
      const error = new Error('No tienes permiso para eliminar esta tarea');
      // @ts-ignore
      error.statusCode = 403;
      throw error;
    }

    await this.taskRepository.deleteById(taskId);
  }
}

module.exports = DeleteTaskUseCase;
