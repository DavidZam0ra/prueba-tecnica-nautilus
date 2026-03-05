// @ts-check

/**
 * @typedef {Object} UserProps
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} password - Hash de la contraseña
 * @property {Date} [createdAt]
 */

/**
 * Entidad de dominio que representa un usuario.
 * No tiene dependencias externas ni lógica de persistencia.
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
