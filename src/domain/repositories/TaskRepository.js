// @ts-check

/**
 * @fileoverview Puerto (interfaz) del repositorio de tareas.
 * Define el contrato que deben cumplir todos los adaptadores de persistencia de tareas.
 */

const Task = require('../entities/Task');

/**
 * Interfaz abstracta para el repositorio de tareas.
 * Las implementaciones concretas (adaptadores) deben extender esta clase
 * o implementar todos sus métodos.
 */
class TaskRepository {
  /**
   * Persiste una nueva tarea.
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  // eslint-disable-next-line no-unused-vars
  async save(task) {
    throw new Error('TaskRepository.save() must be implemented');
  }

  /**
   * Devuelve todas las tareas de un usuario.
   * @param {string} ownerId
   * @returns {Promise<Task[]>}
   */
  // eslint-disable-next-line no-unused-vars
  async findAllByOwner(ownerId) {
    throw new Error('TaskRepository.findAllByOwner() must be implemented');
  }

  /**
   * Busca una tarea por su ID.
   * @param {string} id
   * @returns {Promise<Task|null>}
   */
  // eslint-disable-next-line no-unused-vars
  async findById(id) {
    throw new Error('TaskRepository.findById() must be implemented');
  }

  /**
   * Actualiza una tarea existente.
   * @param {Task} task
   * @returns {Promise<Task>}
   */
  // eslint-disable-next-line no-unused-vars
  async update(task) {
    throw new Error('TaskRepository.update() must be implemented');
  }

  /**
   * Elimina una tarea por su ID.
   * @param {string} id
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line no-unused-vars
  async deleteById(id) {
    throw new Error('TaskRepository.deleteById() must be implemented');
  }
}

module.exports = TaskRepository;
