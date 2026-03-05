import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';

/**
 * @typedef {'login' | 'register' | 'tasks'} AppView
 */

export default function App() {
  const initialView = localStorage.getItem('token') ? 'tasks' : 'login';
  const [view, setView] = useState(/** @type {AppView} */ (initialView));

  if (view === 'tasks') {
    return <TasksPage onLogout={() => setView('login')} />;
  }

  if (view === 'register') {
    return (
      <RegisterPage
        onRegistered={() => setView('login')}
        onGoLogin={() => setView('login')}
      />
    );
  }

  return (
    <LoginPage
      onLogin={() => setView('tasks')}
      onGoRegister={() => setView('register')}
    />
  );
}
