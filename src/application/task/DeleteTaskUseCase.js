// @ts-check

const TaskRepository = require('../../domain/repositories/TaskRepository');

/**
 * Use case: delete a task.
 */
class DeleteTaskUseCase {
  /**
   * @param {TaskRepository} taskRepository
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Deletes a task. Only the owner can delete it.
   * @param {string} taskId
   * @param {string} ownerId
   * @returns {Promise<void>}
   */
  async execute(taskId, ownerId) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    if (task.ownerId !== ownerId) {
      throw new Error('You are not allowed to delete this task');
    }

    await this.taskRepository.deleteById(taskId);
  }
}

module.exports = DeleteTaskUseCase;
