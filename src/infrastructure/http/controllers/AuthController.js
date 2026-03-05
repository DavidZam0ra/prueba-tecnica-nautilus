// @ts-check

const RegisterUserUseCase = require('../../../application/auth/RegisterUserUseCase');
const LoginUserUseCase = require('../../../application/auth/LoginUserUseCase');
const MongoUserRepository = require('../../database/mongodb/repositories/MongoUserRepository');

const userRepository = new MongoUserRepository();

/**
 * Controlador HTTP para los endpoints de autenticación.
 * Instancia los casos de uso inyectando el repositorio MongoDB.
 */
const AuthController = {
  /**
   * POST /api/auth/register
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const useCase = new RegisterUserUseCase(userRepository);
      const user = await useCase.execute({ name, email, password });
      res.status(201).json({
        message: 'Usuario registrado correctamente',
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/auth/login
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const useCase = new LoginUserUseCase(userRepository);
      const result = await useCase.execute({ email, password });
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AuthController;
