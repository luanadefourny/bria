'use strict';

const mongoose = require('./../db.js');

const bookSchema = new mongoose.Schema({
  worksKey: {
    type: String,
    required: false,
  },
  editionKey: {
    type: String,
    required: false,
  },
  isbn: {
    type: String,
    required: false,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  pages: {
    type: Number,
    required: false,
  },
  cover: {
    type: Number,
    required: false,
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