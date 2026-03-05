const LoginUserUseCase = require('../../../src/application/auth/LoginUserUseCase');
const User = require('../../../src/domain/entities/User');

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mocked.jwt.token'),
}));

const bcrypt = require('bcryptjs');

describe('LoginUserUseCase', () => {
  /** @type {jest.Mocked<import('../../../src/domain/repositories/UserRepository')>} */
  let mockUserRepository;

  const existingUser = new User({
    id: 'user-1',
    name: 'Test User',
    email: 'test@test.com',
    password: 'hashed_password',
  });

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('debe devolver un token JWT si las credenciales son correctas', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    // @ts-ignore
    bcrypt.compare.mockResolvedValue(true);

    const useCase = new LoginUserUseCase(mockUserRepository);
    const result = await useCase.execute({ email: 'test@test.com', password: 'correct' });

    expect(result.token).toBe('mocked.jwt.token');
    expect(result.user.email).toBe('test@test.com');
  });

  it('debe lanzar error 401 si el usuario no existe', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const useCase = new LoginUserUseCase(mockUserRepository);

    await expect(
      useCase.execute({ email: 'noexiste@test.com', password: 'pass' })
    ).rejects.toMatchObject({
      statusCode: 401,
      message: 'Credenciales inválidas',
    });
  });

  it('debe lanzar error 401 si la contraseña es incorrecta', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    // @ts-ignore
    bcrypt.compare.mockResolvedValue(false);

    const useCase = new LoginUserUseCase(mockUserRepository);

    await expect(
      useCase.execute({ email: 'test@test.com', password: 'wrong' })
    ).rejects.toMatchObject({
      statusCode: 401,
      message: 'Credenciales inválidas',
    });
  });
});
