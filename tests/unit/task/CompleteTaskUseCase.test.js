const CompleteTaskUseCase = require('../../../src/application/task/CompleteTaskUseCase');
const Task = require('../../../src/domain/entities/Task');

describe('CompleteTaskUseCase', () => {
  /** @type {jest.Mocked<import('../../../src/domain/repositories/TaskRepository')>} */
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

  it('debe marcar la tarea como completada si el usuario es el propietario', async () => {
    const task = new Task({ id: 'task-1', title: 'Tarea', responsible: 'Dev', completed: false, createdAt: new Date(), ownerId });
    const completedTask = task.complete();

    mockTaskRepository.findById.mockResolvedValue(task);
    mockTaskRepository.update.mockResolvedValue(completedTask);

    const useCase = new CompleteTaskUseCase(mockTaskRepository);
    const result = await useCase.execute('task-1', ownerId);

    expect(mockTaskRepository.update).toHaveBeenCalledTimes(1);
    expect(result.completed).toBe(true);
  });

  it('debe lanzar un error 404 si la tarea no existe', async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    const useCase = new CompleteTaskUseCase(mockTaskRepository);

    await expect(useCase.execute('no-existe', ownerId)).rejects.toMatchObject({
      message: 'Tarea no encontrada',
      statusCode: 404,
    });
  });

  it('debe lanzar un error 403 si el usuario no es el propietario', async () => {
    const task = new Task({ id: 'task-1', title: 'Tarea', responsible: 'Dev', completed: false, createdAt: new Date(), ownerId: 'otro-user' });
    mockTaskRepository.findById.mockResolvedValue(task);

    const useCase = new CompleteTaskUseCase(mockTaskRepository);

    await expect(useCase.execute('task-1', ownerId)).rejects.toMatchObject({
      statusCode: 403,
    });
  });
});
