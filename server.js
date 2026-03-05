// @ts-check

require('dotenv').config();

const app = require('./app');
const { connectToDatabase } = require('./src/infrastructure/database/mongodb/connection');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nautilus-tasks';

(async () => {
  try {
    await connectToDatabase(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
      console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Error al arrancar el servidor:', err);
    process.exit(1);
  }
})();
