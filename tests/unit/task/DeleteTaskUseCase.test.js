const DeleteTaskUseCase = require('../../../src/application/task/DeleteTaskUseCase');
const Task = require('../../../src/domain/entities/Task');

describe('DeleteTaskUseCase', () => {
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

  it('debe eliminar la tarea si el usuario es el propietario', async () => {
    const task = new Task({ id: 'task-1', title: 'Tarea', responsible: 'Dev', completed: false, createdAt: new Date(), ownerId });
    mockTaskRepository.findById.mockResolvedValue(task);
    mockTaskRepository.deleteById.mockResolvedValue(undefined);

    const useCase = new DeleteTaskUseCase(mockTaskRepository);
    await useCase.execute('task-1', ownerId);

    expect(mockTaskRepository.deleteById).toHaveBeenCalledWith('task-1');
  });

  it('debe lanzar un error 404 si la tarea no existe', async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    const useCase = new DeleteTaskUseCase(mockTaskRepository);

    await expect(useCase.execute('no-existe', ownerId)).rejects.toMatchObject({
      message: 'Tarea no encontrada',
      statusCode: 404,
    });

    expect(mockTaskRepository.deleteById).not.toHaveBeenCalled();
  });

  it('debe lanzar un error 403 si el usuario no es el propietario', async () => {
    const task = new Task({ id: 'task-1', title: 'Tarea', responsible: 'Dev', completed: false, createdAt: new Date(), ownerId: 'otro-user' });
    mockTaskRepository.findById.mockResolvedValue(task);

    const useCase = new DeleteTaskUseCase(mockTaskRepository);

    await expect(useCase.execute('task-1', ownerId)).rejects.toMatchObject({
      statusCode: 403,
    });

    expect(mockTaskRepository.deleteById).not.toHaveBeenCalled();
  });
});
