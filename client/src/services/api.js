// @ts-check

const BASE_URL = 'http://localhost:3000/api';

/**
 * Devuelve las cabeceras comunes para peticiones autenticadas.
 * @returns {HeadersInit}
 */
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Lanza un Error enriquecido con el mensaje del servidor.
 * @param {Response} response
 * @returns {Promise<never>}
 */
async function handleError(response) {
  const data = await response.json().catch(() => ({}));
  throw new Error(data.message || `HTTP ${response.status}`);
}

// --- Auth ---

/**
 * @param {{ name: string, email: string, password: string }} body
 */
export async function register(body) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return handleError(res);
  return res.json();
}

/**
 * @param {{ email: string, password: string }} body
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function login(body) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return handleError(res);
  return res.json();
}

// --- Tasks ---

/**
 * @returns {Promise<object[]>}
 */
export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks`, { headers: getAuthHeaders() });
  if (!res.ok) return handleError(res);
  return res.json();
}

/**
 * @param {{ title: string, description?: string, responsible: string }} body
 */
export async function createTask(body) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) return handleError(res);
  return res.json();
}

/**
 * @param {string} id
 */
export async function completeTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });
  if (!res.ok) return handleError(res);
  return res.json();
}

/**
 * @param {string} id
 */
export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) return handleError(res);
}
