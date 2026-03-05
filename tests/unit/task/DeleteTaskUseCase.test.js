const DeleteTaskUseCase = require('../../../src/application/task/DeleteTaskUseCase');
const Task = require('../../../src/domain/entities/Task');

describe('DeleteTaskUseCase', () => {
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
  const ownerId = 'user-1';

  beforeEach(() => {
    mockTaskRepository = {
      save: jest.fn(),
      findAllByOwner: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn(),
    };
  });

  it('Should delete the task if the user is the owner', async () => {
    const task = new Task({ id: 'task-1', title: 'Tarea', responsible: 'Dev', completed: false, createdAt: new Date(), ownerId });
    mockTaskRepository.findById.mockResolvedValue(task);
    mockTaskRepository.deleteById.mockResolvedValue(undefined);

    const useCase = new DeleteTaskUseCase(mockTaskRepository);
    await useCase.execute('task-1', ownerId);

    expect(mockTaskRepository.deleteById).toHaveBeenCalledWith('task-1');
  });

  it('Should throw an error 404 if the task does not exist', async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    const useCase = new DeleteTaskUseCase(mockTaskRepository);

    await expect(useCase.execute('no-existe', ownerId)).rejects.toMatchObject({
      message: 'Task not found',
    });

    expect(mockTaskRepository.deleteById).not.toHaveBeenCalled();
  });

  it('Should throw an error 403 if the user is not the owner', async () => {
    const task = new Task({ id: 'task-1', title: 'Tarea', responsible: 'Dev', completed: false, createdAt: new Date(), ownerId: 'otro-user' });
    mockTaskRepository.findById.mockResolvedValue(task);

    const useCase = new DeleteTaskUseCase(mockTaskRepository);

    await expect(useCase.execute('task-1', ownerId)).rejects.toMatchObject({
      message: 'You are not allowed to delete this task',
    });

    expect(mockTaskRepository.deleteById).not.toHaveBeenCalled();
  });
});
