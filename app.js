// @ts-check

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./src/infrastructure/http/routes/authRoutes');
const taskRoutes = require('./src/infrastructure/http/routes/taskRoutes');
const errorMiddleware = require('./src/infrastructure/http/middlewares/errorMiddleware');
const swaggerSpec = require('./src/infrastructure/http/swagger/swaggerConfig');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

/**
 * Ruta de health check.
 * @openapi
 * /api/health:
 *   get:
 *     summary: Comprobar que el servidor está en línea
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servidor operativo
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorMiddleware);

module.exports = app;
