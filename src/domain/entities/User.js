// @ts-check

/**
 * @typedef {Object} UserProps
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} password - Password hash
 * @property {Date} [createdAt]
 */

/**
 * Domain entity representing a user.
 * It has no external dependencies or persistence logic.
 */
class User {
  /**
   * @param {UserProps} props
   */
  constructor({ id, name, email, password, createdAt = new Date() }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }
}

module.exports = User;
