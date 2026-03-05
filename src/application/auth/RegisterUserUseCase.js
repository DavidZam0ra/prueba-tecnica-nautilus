// @ts-check

const bcrypt = require('bcryptjs');
const User = require('../../domain/entities/User');
const UserRepository = require('../../domain/repositories/UserRepository');

/**
 * @typedef {Object} RegisterDTO
 * @property {string} name
 * @property {string} email
 * @property {string} password - Plain-text password (hashed in this use case)
 */

/**
 * Use case: register a new user.
 */
class RegisterUserUseCase {
  /**
   * @param {UserRepository} userRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Registers a new user after checking the email is not already in use.
   * @param {RegisterDTO} dto
   * @returns {Promise<User>}
   */
  async execute({ name, email, password }) {
    const existing = await this.userRepository.findByEmail(email);

    if (existing) {
      throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      id: '',
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return this.userRepository.save(user);
  }
}

module.exports = RegisterUserUseCase;
