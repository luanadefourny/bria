'use strict';

const mongoose = require('./../db.js');

const userBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: true,
  },
  shelfIds: {
    type: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Shelf',
    }],
    required: false,
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },
  reads: {
    type: [{
      dateStarted: Date,
      dateCompleted: Date,
      rating: Number,
      notes: String,
    }],
    required: false
  },
  readCount: {
    type: Number,
    required: true,
    default: 0,
  },
  // rating: {
  //   type: Number,
  //   required: false,
  // },
  // notes: {
  //   type: String,
  //   require: false,
  // },
  // dateStarted: {
  //   type: [Date],
  //   required: false,
  // },
  // dateCompleted: {
  //   type: [Date],
  //   required: false,
  // },
  read: {
    type: Boolean,
    default: false,
  },
  owned: {
    type: Boolean,
    default: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: [
      'not reading',
      'reading',
      'read',
    ],
    default: 'not reading',
  }
});

const UserBook = mongoose.model('UserBook', userBookSchema);

module.exports = UserBook;