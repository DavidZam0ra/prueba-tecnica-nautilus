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
 * @property {string} token - Signed JWT
 * @property {{ id: string, name: string, email: string }} user
 */

/**
 * Use case: authenticate a user and return a JWT.
 */
class LoginUserUseCase {
  /**
   * @param {UserRepository} userRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Validates user credentials and returns a JWT on success.
   * @param {LoginDTO} dto
   * @returns {Promise<LoginResult>}
   */
  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    /** @type {import('jsonwebtoken').Secret} */
    const secret = process.env.JWT_SECRET || 'default_secret';
    /** @type {import('jsonwebtoken').SignOptions} */
    const signOptions = {
      expiresIn: process.env.JWT_EXPIRES_IN
        ? /** @type {import('jsonwebtoken').SignOptions['expiresIn']} */ (process.env.JWT_EXPIRES_IN)
        : 3600,
    };

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      signOptions
    );

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}

module.exports = LoginUserUseCase;
