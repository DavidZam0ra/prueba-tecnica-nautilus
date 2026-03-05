// @ts-check

const mongoose = require('mongoose');

/**
 * Establece la conexión con MongoDB.
 * @param {string} uri - URI de conexión de MongoDB
 * @returns {Promise<void>}
 */
async function connectToDatabase(uri) {
  await mongoose.connect(uri);
  console.log('Conexión a MongoDB establecida');
}

/**
 * Cierra la conexión con MongoDB.
 * @returns {Promise<void>}
 */
async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

module.exports = { connectToDatabase, disconnectFromDatabase };
