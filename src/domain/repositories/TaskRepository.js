// @ts-check

/**
 * @fileoverview Task repository port (interface).
 * Defines the contract that all task persistence adapters must implement.
 */

const Task = require('../entities/Task');

/**
 * Abstract interface for task repositories.
 */
class TaskRepository {
  /**
   * Persists a new task.
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  async save(_task) {
    throw new Error('TaskRepository.save() must be implemented');
  }

  /**
   * Returns all tasks for a user.
   * @param {string} ownerId
   * @returns {Promise<Task[]>}
   */
  async findAllByOwner(_ownerId) {
    throw new Error('TaskRepository.findAllByOwner() must be implemented');
  }

  /**
   * Finds a task by ID.
   * @param {string} id
   * @returns {Promise<Task|null>}
   */
  async findById(_id) {
    throw new Error('TaskRepository.findById() must be implemented');
  }

  /**
   * Updates an existing task.
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  async update(_task) {
    throw new Error('TaskRepository.update() must be implemented');
  }

  /**
   * Deletes a task by ID.
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteById(_id) {
    throw new Error('TaskRepository.deleteById() must be implemented');
  }
}

module.exports = TaskRepository;
