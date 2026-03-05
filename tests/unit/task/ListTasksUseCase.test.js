const ListTasksUseCase = require('../../../src/application/task/ListTasksUseCase');
const Task = require('../../../src/domain/entities/Task');

describe('ListTasksUseCase', () => {
  /**
   * @type {{
   *   save: jest.Mock,
   *   findAllByOwner: jest.Mock,
   *   findById: jest.Mock,
   *   update: jest.Mock,
   *   deleteById: jest.Mock
   * }}
   */
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

  it('Should return the tasks of the user', async () => {
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

  it('Should return an empty list if the user has no tasks', async () => {
    mockTaskRepository.findAllByOwner.mockResolvedValue([]);

    const useCase = new ListTasksUseCase(mockTaskRepository);
    const result = await useCase.execute('user-sin-tareas');

    expect(result).toEqual([]);
  });
});
