// @ts-check

const Task = require('../../domain/entities/Task');
const TaskRepository = require('../../domain/repositories/TaskRepository');

/**
 * Use case: mark a task as completed.
 */
class CompleteTaskUseCase {
  /**
   * @param {TaskRepository} taskRepository
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Marks a task as completed.
   * Only the owner can complete their own task.
   * @param {string} taskId
   * @param {string} ownerId
   * @returns {Promise<Task>}
   */
  async execute(taskId, ownerId) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    if (task.ownerId !== ownerId) {
      throw new Error('You are not allowed to update this task');
    }

    const completedTask = task.complete();
    return this.taskRepository.update(completedTask);
  }
}

module.exports = CompleteTaskUseCase;
