const RegisterUserUseCase = require('../../../src/application/auth/RegisterUserUseCase');
const User = require('../../../src/domain/entities/User');

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('RegisterUserUseCase', () => {
  /** @type {jest.Mocked<import('../../../src/domain/repositories/UserRepository')>} */
  let mockUserRepository;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };
  });

  it('debe registrar un usuario nuevo correctamente', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const savedUser = new User({ id: 'user-1', name: 'Ana', email: 'ana@test.com', password: 'hashed_password' });
    mockUserRepository.save.mockResolvedValue(savedUser);

    const useCase = new RegisterUserUseCase(mockUserRepository);
    const result = await useCase.execute({ name: 'Ana', email: 'ana@test.com', password: 'password123' });

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('ana@test.com');
    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    expect(result.email).toBe('ana@test.com');
  });

  it('debe guardar la contraseña hasheada, no en texto plano', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    const savedUser = new User({ id: 'u1', name: 'Test', email: 'test@test.com', password: 'hashed_password' });
    mockUserRepository.save.mockResolvedValue(savedUser);

    const useCase = new RegisterUserUseCase(mockUserRepository);
    await useCase.execute({ name: 'Test', email: 'test@test.com', password: 'plain' });

    const userPassedToRepo = mockUserRepository.save.mock.calls[0][0];
    expect(userPassedToRepo.password).toBe('hashed_password');
    expect(userPassedToRepo.password).not.toBe('plain');
  });

  it('debe lanzar un error 409 si el email ya está registrado', async () => {
    const existingUser = new User({ id: 'u-existing', name: 'Existente', email: 'exist@test.com', password: 'hash' });
    mockUserRepository.findByEmail.mockResolvedValue(existingUser);

    const useCase = new RegisterUserUseCase(mockUserRepository);

    await expect(
      useCase.execute({ name: 'Nuevo', email: 'exist@test.com', password: 'pass123' })
    ).rejects.toMatchObject({
      message: 'El email ya está registrado',
      statusCode: 409,
    });

    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });
});
