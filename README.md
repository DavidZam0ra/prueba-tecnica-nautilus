# Nautilus Tasks API

API REST para la gestión de tareas (to-do) desarrollada con **Node.js + Express + MongoDB** usando **arquitectura hexagonal** (Ports & Adapters). Incluye autenticación JWT, documentación Swagger y un frontend básico en React.

---

## Índice

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [MongoDB con Docker (local)](#mongodb-con-docker-local)
- [Ejecutar la aplicación](#ejecutar-la-aplicación)
- [Ejecutar los tests](#ejecutar-los-tests)
- [Endpoints de la API](#endpoints-de-la-api)
- [Documentación Swagger](#documentación-swagger)
- [Frontend](#frontend)
- [Arquitectura](#arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)

---

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [MongoDB](https://www.mongodb.com/) corriendo localmente o una URI de MongoDB Atlas

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/prueba-tecnica-nautilus.git
cd prueba-tecnica-nautilus

# 2. Instalar dependencias del backend
npm install

# 3. Instalar dependencias del frontend
cd client && npm install && cd ..
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto a partir del fichero de ejemplo:

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nautilus-tasks
JWT_SECRET=cambia_esto_en_produccion
JWT_EXPIRES_IN=1h
```

---

## MongoDB con Docker (local)

Para que las peticiones del backend funcionen en local, debes levantar MongoDB.

Si no tienes MongoDB Server instalado en tu máquina, puedes usar Docker:

```bash
# Crear y levantar un contenedor de MongoDB en segundo plano
docker run -d --name nautilus-mongo -p 27017:27017 mongo:7
```

Comprobar que está corriendo:

```bash
docker ps
```

Con este contenedor levantado, la variable del `.env` ya funciona:

```env
MONGODB_URI=mongodb://localhost:27017/nautilus-tasks
```

Parar o arrancar de nuevo el contenedor:

```bash
docker stop nautilus-mongo
docker start nautilus-mongo
```

Eliminar el contenedor (opcional):

```bash
docker rm -f nautilus-mongo
```

---

## Ejecutar la aplicación

### Backend

```bash
# Modo producción
npm start

# Modo desarrollo (recarga automática, requiere Node.js v18+)
npm run dev
```

El servidor arranca en `http://localhost:3000`.

### Frontend

```bash
cd client
npm run dev
```

El frontend arranca en `http://localhost:5173` y hace proxy de `/api` al backend automáticamente.

---

## Ejecutar los tests

Los tests son unitarios y no requieren conexión a MongoDB.

```bash
# Ejecutar todos los tests
npm test

# Con informe de cobertura
npm run test:coverage
```

---

## Endpoints de la API

### Autenticación

| Método | Endpoint              | Descripción                    | Auth |
|--------|-----------------------|-------------------------------|------|
| POST   | `/api/auth/register`  | Registrar un nuevo usuario     | No   |
| POST   | `/api/auth/login`     | Iniciar sesión y obtener JWT   | No   |

### Tareas

| Método | Endpoint                    | Descripción                        | Auth |
|--------|-----------------------------|------------------------------------|------|
| GET    | `/api/tasks`                | Listar todas las tareas del usuario | Sí   |
| POST   | `/api/tasks`                | Crear una nueva tarea               | Sí   |
| PATCH  | `/api/tasks/:id/complete`   | Marcar una tarea como completada    | Sí   |
| DELETE | `/api/tasks/:id`            | Eliminar una tarea                  | Sí   |

Los endpoints protegidos requieren la cabecera:
```
Authorization: Bearer <token>
```

### Ejemplo: Crear tarea

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "Revisar PR", "description": "Revisar el PR #42", "responsible": "Ana Torres"}'
```

---

## Documentación Swagger

Con el servidor en marcha, accede a la documentación interactiva en:

```
http://localhost:3000/api-docs
```

---

## Frontend

El frontend es una SPA en React (Vite) con tres vistas:

- **Login** — Iniciar sesión con email y contraseña
- **Register** — Crear una nueva cuenta
- **Tasks** — Ver, crear, completar y eliminar tareas

---

## Arquitectura

El proyecto sigue la **arquitectura hexagonal** (Ports & Adapters):

```
┌──────────────────────────────────────────────┐
│                Infrastructure                 │
│  ┌─────────────────┐  ┌────────────────────┐  │
│  │  Express HTTP   │  │  MongoDB Repos     │  │
│  │  (Controllers,  │  │  (MongoTask/User   │  │
│  │   Routes)       │  │   Repository)      │  │
│  └────────┬────────┘  └────────┬───────────┘  │
│           │ llama               │ implementa   │
├───────────┼─────────────────────┼──────────────┤
│           │   Application       │              │
│  ┌────────▼────────────────────▼───────────┐  │
│  │           Use Cases                      │  │
│  │ (CreateTask, ListTasks, CompleteTask,    │  │
│  │  DeleteTask, RegisterUser, LoginUser)    │  │
│  └────────────────────┬────────────────────┘  │
│              depende de│                       │
├────────────────────────┼───────────────────────┤
│                        │   Domain               │
│  ┌─────────────────────▼────────────────────┐  │
│  │  Entities (Task, User)                   │  │
│  │  Repository Ports (TaskRepo, UserRepo)   │  │
│  └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

- **Domain**: entidades JS puras sin dependencias externas. Los puertos son interfaces (contratos) que define el dominio.
- **Application**: casos de uso orquestadores. Reciben los repositorios por inyección de dependencias.
- **Infrastructure**: adaptadores concretos (MongoDB, Express). Implementan los puertos del dominio.

Esta separación garantiza que los casos de uso son 100% testeables sin base de datos ni HTTP.

---

## Estructura del proyecto

```
prueba-tecnica-nautilus/
├── src/
│   ├── domain/
│   │   ├── entities/          # Task.js, User.js
│   │   └── repositories/      # Puertos: TaskRepository.js, UserRepository.js
│   ├── application/
│   │   ├── task/              # Casos de uso de tareas
│   │   └── auth/              # Casos de uso de autenticación
│   └── infrastructure/
│       ├── database/mongodb/  # Modelos Mongoose y repositorios adaptadores
│       └── http/              # Controladores, middlewares, rutas, Swagger
├── tests/
│   └── unit/                  # Tests unitarios (sin BD)
├── client/                    # Frontend React + Vite
├── app.js                     # Express app (exportada sin listen)
├── server.js                  # Punto de entrada con conexión a MongoDB
├── .env.example
└── package.json
```
