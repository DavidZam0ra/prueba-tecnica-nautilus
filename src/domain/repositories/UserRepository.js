// @ts-check

/**
 * @fileoverview Puerto (interfaz) del repositorio de usuarios.
 * Define el contrato que deben cumplir todos los adaptadores de persistencia de usuarios.
 */

const User = require('../entities/User');

/**
 * Interfaz abstracta para el repositorio de usuarios.
 */
class UserRepository {
  /**
   * Persiste un nuevo usuario.
   * @param {User} user
   * @returns {Promise<User>}
   */
  // eslint-disable-next-line no-unused-vars
  async save(user) {
    throw new Error('UserRepository.save() must be implemented');
  }

  /**
   * Busca un usuario por su email.
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  // eslint-disable-next-line no-unused-vars
  async findByEmail(email) {
    throw new Error('UserRepository.findByEmail() must be implemented');
  }

  /**
   * Busca un usuario por su ID.
   * @param {string} id
   * @returns {Promise<User|null>}
   */
  // eslint-disable-next-line no-unused-vars
  async findById(id) {
    throw new Error('UserRepository.findById() must be implemented');
  }
}

module.exports = UserRepository;
