'use strict';

const mongoose = require('./../db.js');

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: [String],
    required: true,
  },
  pages: {
    type: Number,
    required: false,
  },
  cover: {
    type: Number,
    require: false,
  },
  publishedDate: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  genres: {
    type: [String],
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;