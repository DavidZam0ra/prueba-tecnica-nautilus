const ListTasksUseCase = require('../../../src/application/task/ListTasksUseCase');
const Task = require('../../../src/domain/entities/Task');

describe('ListTasksUseCase', () => {
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

  it('debe devolver las tareas del usuario', async () => {
    const ownerId = 'user-1';
    const tasks = [
      new Task({ id: 't1', title: 'Tarea A', responsible: 'Dev', completed: false, createdAt: new Date(), ownerId }),
      new Task({ id: 't2', title: 'Tarea B', responsible: 'Dev', completed: true, createdAt: new Date(), ownerId }),
    ];
    mockTaskRepository.findAllByOwner.mockResolvedValue(tasks);

    const useCase = new ListTasksUseCase(mockTaskRepository);
    const result = await useCase.execute(ownerId);

    expect(mockTaskRepository.findAllByOwner).toHaveBeenCalledWith(ownerId);
    expect(result).toHaveLength(2);
  });

  it('debe devolver una lista vacía si el usuario no tiene tareas', async () => {
    mockTaskRepository.findAllByOwner.mockResolvedValue([]);

    const useCase = new ListTasksUseCase(mockTaskRepository);
    const result = await useCase.execute('user-sin-tareas');

    expect(result).toEqual([]);
  });
});
