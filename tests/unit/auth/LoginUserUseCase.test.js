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
  /**
   * @type {{
   *   save: jest.Mock,
   *   findByEmail: jest.Mock,
   *   findById: jest.Mock
   * }}
   */
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

  it('Should return a JWT token if the credentials are correct', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    /** @type {jest.Mock} */ (bcrypt.compare).mockResolvedValue(true);

    const useCase = new LoginUserUseCase(mockUserRepository);
    const result = await useCase.execute({ email: 'test@test.com', password: 'correct' });

    expect(result.token).toBe('mocked.jwt.token');
    expect(result.user.email).toBe('test@test.com');
  });

  it('Should throw an error 401 if the user does not exist', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const useCase = new LoginUserUseCase(mockUserRepository);

    await expect(
      useCase.execute({ email: 'noexiste@test.com', password: 'pass' })
    ).rejects.toMatchObject({
      message: 'Invalid credentials',
    });
  });

  it('Should throw an error 401 if the password is incorrect', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    /** @type {jest.Mock} */ (bcrypt.compare).mockResolvedValue(false);

    const useCase = new LoginUserUseCase(mockUserRepository);

    await expect(
      useCase.execute({ email: 'test@test.com', password: 'wrong' })
    ).rejects.toMatchObject({
      message: 'Invalid credentials',
    });
  });
});
