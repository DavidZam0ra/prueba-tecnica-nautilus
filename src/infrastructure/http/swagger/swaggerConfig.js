// @ts-check

const swaggerJsdoc = require('swagger-jsdoc');

/** @type {swaggerJsdoc.Options} */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nautilus Tasks API',
      version: '1.0.0',
      description: 'API REST para gestión de tareas con arquitectura hexagonal. Autenticación mediante JWT.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/infrastructure/http/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
