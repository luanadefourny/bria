'use strict';

const mongoose = require('./../db.js');

const shelfSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const Shelf = mongoose.model('Shelf', shelfSchema);

module.exports = Shelf;