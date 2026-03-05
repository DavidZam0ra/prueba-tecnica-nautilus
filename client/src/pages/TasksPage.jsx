import { useState, useEffect } from 'react';
import { getTasks, createTask, completeTask, deleteTask } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

/**
 * Página principal de gestión de tareas.
 * @param {{ onLogout: () => void }} props
 */
export default function TasksPage({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  async function fetchTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleCreate(formData) {
    try {
      await createTask(formData);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleComplete(id) {
    try {
      await completeTask(id);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar esta tarea?')) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  }

  return (
    <div className="tasks-container">
      <header className="tasks-header">
        <h1>Mis Tareas</h1>
        <div className="header-actions">
          <span>Hola, {user.name}</span>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancelar' : '+ Nueva tarea'}
          </button>
          <button onClick={handleLogout} className="btn-secondary">
            Cerrar sesión
          </button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      {showForm && <TaskForm onSubmit={handleCreate} />}

      {loading ? (
        <p className="loading">Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p className="empty">No hay tareas todavía. ¡Crea la primera!</p>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
