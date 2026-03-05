// @ts-check

const swaggerJsdoc = require('swagger-jsdoc');

/** @type {swaggerJsdoc.Options} */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nautilus Tasks API',
      version: '1.0.0',
      description: 'REST API for task management with hexagonal architecture and JWT authentication.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/infrastructure/http/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
