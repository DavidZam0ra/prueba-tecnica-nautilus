// @ts-check

const mongoose = require('mongoose');

/**
 * Opens the MongoDB connection.
 * @param {string} uri - MongoDB connection URI
 * @returns {Promise<void>}
 */
async function connectToDatabase(uri) {
  await mongoose.connect(uri);
  console.log('MongoDB connection established');
}

/**
 * Closes the MongoDB connection.
 * @returns {Promise<void>}
 */
async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

module.exports = { connectToDatabase, disconnectFromDatabase };
