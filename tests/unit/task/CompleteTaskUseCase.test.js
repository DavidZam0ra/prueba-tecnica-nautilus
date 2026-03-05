const CompleteTaskUseCase = require('../../../src/application/task/CompleteTaskUseCase');
const Task = require('../../../src/domain/entities/Task');

describe('CompleteTaskUseCase', () => {
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

  it('Should mark the task as completed if the user is the owner', async () => {
    const task = new Task({ id: 'task-1', title: 'Tarea', responsible: 'Dev', completed: false, createdAt: new Date(), ownerId });
    const completedTask = task.complete();

    mockTaskRepository.findById.mockResolvedValue(task);
    mockTaskRepository.update.mockResolvedValue(completedTask);

    const useCase = new CompleteTaskUseCase(mockTaskRepository);
    const result = await useCase.execute('task-1', ownerId);

    expect(mockTaskRepository.update).toHaveBeenCalledTimes(1);
    expect(result.completed).toBe(true);
  });

  it('Should throw an error 404 if the task does not exist', async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    const useCase = new CompleteTaskUseCase(mockTaskRepository);

    await expect(useCase.execute('no-existe', ownerId)).rejects.toMatchObject({
      message: 'Task not found',
    });
  });

  it('Should throw an error 403 if the user is not the owner', async () => {
    const task = new Task({ id: 'task-1', title: 'Tarea', responsible: 'Dev', completed: false, createdAt: new Date(), ownerId: 'otro-user' });
    mockTaskRepository.findById.mockResolvedValue(task);

    const useCase = new CompleteTaskUseCase(mockTaskRepository);

    await expect(useCase.execute('task-1', ownerId)).rejects.toMatchObject({
      message: 'You are not allowed to update this task',
    });
  });
});
