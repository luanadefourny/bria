'use strict';
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');

const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME //change in the .env file if need another one
const MONGODB_URI = process.env.MONGO_URI || `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`;

(async() => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to db: ', MONGODB_URI);
  } catch (error) {
    console.log(`Could not connect: ${error}`);
  }
})();

module.exports = mongoose;