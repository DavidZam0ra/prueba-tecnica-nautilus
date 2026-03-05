// @ts-check

const bcrypt = require('bcryptjs');
const User = require('../../domain/entities/User');
const UserRepository = require('../../domain/repositories/UserRepository');

/**
 * @typedef {Object} RegisterDTO
 * @property {string} name
 * @property {string} email
 * @property {string} password - Contraseña en texto plano (se hashea aquí)
 */

/**
 * Caso de uso: Registrar un nuevo usuario.
 */
class RegisterUserUseCase {
  /**
   * @param {UserRepository} userRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Registra un nuevo usuario tras verificar que el email no esté en uso.
   * @param {RegisterDTO} dto
   * @returns {Promise<User>}
   */
  async execute({ name, email, password }) {
    const existing = await this.userRepository.findByEmail(email);

    if (existing) {
      const error = new Error('El email ya está registrado');
      // @ts-ignore
      error.statusCode = 409;
      throw error;
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
