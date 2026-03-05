// @ts-check

const Task = require('../../../../domain/entities/Task');
const TaskRepository = require('../../../../domain/repositories/TaskRepository');
const TaskModel = require('../models/TaskModel');

/**
 * Adapter: TaskRepository implementation using MongoDB/Mongoose.
 * Maps Mongoose documents to domain Task entities and back.
 * @extends {TaskRepository}
 */
class MongoTaskRepository extends TaskRepository {
  /**
   * Maps a Mongoose document to a Task domain entity.
   * @param {import('mongoose').Document & Record<string, any>} doc
   * @returns {Task}
   */
  _toEntity(doc) {
    return new Task({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      responsible: doc.responsible,
      completed: doc.completed,
      createdAt: doc.createdAt,
      ownerId: doc.owner.toString(),
    });
  }

  /**
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  async save(task) {
    const doc = await TaskModel.create({
      title: task.title,
      description: task.description,
      responsible: task.responsible,
      completed: task.completed,
      owner: task.ownerId,
    });
    return this._toEntity(doc);
  }

  /**
   * @param {string} ownerId
   * @returns {Promise<Task[]>}
   */
  async findAllByOwner(ownerId) {
    const docs = await TaskModel.find({ owner: ownerId }).sort({ createdAt: -1 });
    return docs.map((doc) => this._toEntity(doc));
  }

  /**
   * @param {string} id
   * @returns {Promise<Task|null>}
   */
  async findById(id) {
    const doc = await TaskModel.findById(id);
    if (!doc) return null;
    return this._toEntity(doc);
  }

  /**
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  async update(task) {
    const doc = await TaskModel.findByIdAndUpdate(
      task.id,
      { completed: task.completed },
      { new: true }
    );
    if (!doc) {
      throw new Error('Task not found while updating');
    }
    return this._toEntity(doc);
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteById(id) {
    await TaskModel.findByIdAndDelete(id);
  }
}

module.exports = MongoTaskRepository;
