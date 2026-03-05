// @ts-check

const User = require('../../../../domain/entities/User');
const UserRepository = require('../../../../domain/repositories/UserRepository');
const UserModel = require('../models/UserModel');

/**
 * Adaptador: implementación de UserRepository usando MongoDB/Mongoose.
 * @extends {UserRepository}
 */
class MongoUserRepository extends UserRepository {
  /**
   * Convierte un documento Mongoose en una entidad User del dominio.
   * @param {import('mongoose').Document & Record<string, any>} doc
   * @returns {User}
   */
  _toEntity(doc) {
    return new User({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      createdAt: doc.createdAt,
    });
  }

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  async save(user) {
    const doc = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return this._toEntity(doc);
  }

  /**
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  async findByEmail(email) {
    const doc = await UserModel.findOne({ email: email.toLowerCase() });
    if (!doc) return null;
    return this._toEntity(doc);
  }

  /**
   * @param {string} id
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    const doc = await UserModel.findById(id);
    if (!doc) return null;
    return this._toEntity(doc);
  }
}

module.exports = MongoUserRepository;
