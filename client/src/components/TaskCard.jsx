/**
 * Tarjeta que muestra los datos de una tarea con acciones.
 * @param {{ task: object, onComplete: (id: string) => void, onDelete: (id: string) => void }} props
 */
export default function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? 'task-card--done' : ''}`}>
      <div className="task-card__body">
        <h3 className="task-card__title">{task.title}</h3>
        {task.description && <p className="task-card__desc">{task.description}</p>}
        <p className="task-card__responsible">
          <strong>Responsable:</strong> {task.responsible}
        </p>
        <span className={`task-card__badge ${task.completed ? 'badge--done' : 'badge--pending'}`}>
          {task.completed ? 'Completada' : 'Pendiente'}
        </span>
      </div>
      <div className="task-card__actions">
        {!task.completed && (
          <button className="btn-complete" onClick={() => onComplete(task.id)}>
            Completar
          </button>
        )}
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
