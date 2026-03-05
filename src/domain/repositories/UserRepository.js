// @ts-check

/**
 * @fileoverview User repository port (interface).
 * Defines the contract that all user persistence adapters must implement.
 */

const User = require('../entities/User');

/**
 * Abstract interface for user repositories.
 */
class UserRepository {
  /**
   * Persists a new user.
   * @param {User} user
   * @returns {Promise<User>}
   */
  async save(_user) {
    throw new Error('UserRepository.save() must be implemented');
  }

  /**
   * Finds a user by email.
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  async findByEmail(_email) {
    throw new Error('UserRepository.findByEmail() must be implemented');
  }

  /**
   * Finds a user by ID.
   * @param {string} id
   * @returns {Promise<User|null>}
   */
  async findById(_id) {
    throw new Error('UserRepository.findById() must be implemented');
  }
}

module.exports = UserRepository;
