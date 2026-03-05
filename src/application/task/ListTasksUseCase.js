// @ts-check

const Task = require('../../domain/entities/Task');
const TaskRepository = require('../../domain/repositories/TaskRepository');

/**
 * Caso de uso: Listar todas las tareas de un usuario.
 */
class ListTasksUseCase {
  /**
   * @param {TaskRepository} taskRepository
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Devuelve todas las tareas pertenecientes al usuario indicado.
   * @param {string} ownerId
   * @returns {Promise<Task[]>}
   */
  async execute(ownerId) {
    return this.taskRepository.findAllByOwner(ownerId);
  }
}

module.exports = ListTasksUseCase;
