import { useState } from 'react';

/**
 * Formulario para crear una nueva tarea.
 * @param {{ onSubmit: (data: { title: string, description: string, responsible: string }) => void }} props
 */
export default function TaskForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', description: '', responsible: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', responsible: '' });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Nueva Tarea</h2>
      <label>Título *</label>
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <label>Descripción</label>
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={3}
      />
      <label>Responsable *</label>
      <input
        type="text"
        value={form.responsible}
        onChange={(e) => setForm({ ...form, responsible: e.target.value })}
        required
      />
      <button type="submit" className="btn-primary">
        Crear tarea
      </button>
    </form>
  );
}
