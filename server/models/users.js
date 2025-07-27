'use strict';

const mongoose = require('./../db.js');
// const mongoose = require('mongoose'); //only for seeding mock data

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;