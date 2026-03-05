// @ts-check

const Task = require('../../domain/entities/Task');
const TaskRepository = require('../../domain/repositories/TaskRepository');

/**
 * @typedef {Object} CreateTaskDTO
 * @property {string} title
 * @property {string} [description]
 * @property {string} responsible
 * @property {string} ownerId
 */

/**
 * Caso de uso: Crear una nueva tarea.
 * Recibe el repositorio por inyección de dependencias para desacoplarse de la infraestructura.
 */
class CreateTaskUseCase {
  /**
   * @param {TaskRepository} taskRepository
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Ejecuta la creación de una tarea.
   * @param {CreateTaskDTO} dto
   * @returns {Promise<Task>}
   */
  async execute({ title, description, responsible, ownerId }) {
    const task = new Task({
      id: '',
      title,
      description,
      responsible,
      completed: false,
      createdAt: new Date(),
      ownerId,
    });

    return this.taskRepository.save(task);
  }
}

module.exports = CreateTaskUseCase;
