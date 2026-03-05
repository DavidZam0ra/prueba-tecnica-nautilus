// @ts-check

const Task = require('../../domain/entities/Task');
const TaskRepository = require('../../domain/repositories/TaskRepository');

/**
 * Use case: list all tasks for a user.
 */
class ListTasksUseCase {
  /**
   * @param {TaskRepository} taskRepository
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Returns all tasks that belong to the provided owner.
   * @param {string} ownerId
   * @returns {Promise<Task[]>}
   */
  async execute(ownerId) {
    return this.taskRepository.findAllByOwner(ownerId);
  }
}

module.exports = ListTasksUseCase;
