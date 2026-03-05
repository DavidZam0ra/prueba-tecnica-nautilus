// @ts-check

/**
 * @typedef {Object} TaskProps
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {string} responsible
 * @property {boolean} completed
 * @property {Date} createdAt
 * @property {string} ownerId
 */

/**
 * Domain entity representing a task.
 * It has no external dependencies or persistence logic.
 */
class Task {
  /**
   * @param {TaskProps} props
   */
  constructor({ id, title, description = '', responsible, completed = false, createdAt = new Date(), ownerId }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.responsible = responsible;
    this.completed = completed;
    this.createdAt = createdAt;
    this.ownerId = ownerId;
  }

  /**
   * Returns a new Task instance marked as completed.
   * @returns {Task}
   */
  complete() {
    return new Task({ ...this, completed: true });
  }
}

module.exports = Task;
