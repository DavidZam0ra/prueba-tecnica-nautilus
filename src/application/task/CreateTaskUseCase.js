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
 * Use case: create a new task.
 * The repository is injected to keep the use case independent from infrastructure.
 */
class CreateTaskUseCase {
  /**
   * @param {TaskRepository} taskRepository
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Executes task creation.
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
