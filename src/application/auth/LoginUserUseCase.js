// @ts-check

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../domain/repositories/UserRepository');

/**
 * @typedef {Object} LoginDTO
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginResult
 * @property {string} token - JWT firmado
 * @property {{ id: string, name: string, email: string }} user
 */

/**
 * Caso de uso: Autenticar un usuario y devolver un JWT.
 */
class LoginUserUseCase {
  /**
   * @param {UserRepository} userRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Valida las credenciales y devuelve un JWT si son correctas.
   * @param {LoginDTO} dto
   * @returns {Promise<LoginResult>}
   */
  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      const error = new Error('Credenciales inválidas');
      // @ts-ignore
      error.statusCode = 401;
      throw error;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const error = new Error('Credenciales inválidas');
      // @ts-ignore
      error.statusCode = 401;
      throw error;
    }

    const secret = process.env.JWT_SECRET || 'default_secret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn }
    );

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}

module.exports = LoginUserUseCase;
