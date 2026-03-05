const CreateTaskUseCase = require('../../../src/application/task/CreateTaskUseCase');
const Task = require('../../../src/domain/entities/Task');

describe('CreateTaskUseCase', () => {
  /** @type {jest.Mocked<import('../../../src/domain/repositories/TaskRepository')>} */
  let mockTaskRepository;

  beforeEach(() => {
    mockTaskRepository = {
      save: jest.fn(),
      findAllByOwner: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };
  });

  it('debe crear y persistir una tarea correctamente', async () => {
    const dto = {
      title: 'Configurar CI/CD',
      description: 'Usar GitHub Actions',
      responsible: 'Ana Torres',
      ownerId: 'user-1',
    };

    const savedTask = new Task({ id: 'task-1', ...dto, completed: false, createdAt: new Date() });
    mockTaskRepository.save.mockResolvedValue(savedTask);

    const useCase = new CreateTaskUseCase(mockTaskRepository);
    const result = await useCase.execute(dto);

    expect(mockTaskRepository.save).toHaveBeenCalledTimes(1);
    expect(result.title).toBe(dto.title);
    expect(result.responsible).toBe(dto.responsible);
    expect(result.completed).toBe(false);
  });

  it('debe pasar el ownerId correcto al repositorio', async () => {
    const dto = {
      title: 'Test',
      responsible: 'Dev',
      ownerId: 'owner-42',
    };

    const savedTask = new Task({ id: 'task-2', ...dto, completed: false, createdAt: new Date() });
    mockTaskRepository.save.mockResolvedValue(savedTask);

    const useCase = new CreateTaskUseCase(mockTaskRepository);
    await useCase.execute(dto);

    const taskPassedToRepo = mockTaskRepository.save.mock.calls[0][0];
    expect(taskPassedToRepo.ownerId).toBe('owner-42');
  });
});
