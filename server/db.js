'use strict';
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');

const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'bria';

(async() => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`);
    console.log('Connected to db: ', DB_NAME);
  } catch (error) {
    console.log(`Could not connect: ${error}`);
  }
})();

module.exports = mongoose;