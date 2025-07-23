'use strict';

const mongoose = require('./../db.js');

const bookSchema = new mongoose.Schema({
  isbn: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
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
  published: {
    type: Date,
    required: false,
  },
  genres: {
    type: Array,
    required: false,
  },
  shelves:{
    type: Array,
    required: false,
  },
  read: {
    type: Boolean,
    required: true,
    default: false,
  },
  owned: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;