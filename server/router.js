'use strict';

const express = require('express');
const { postBook, getBooks } = require('./controllers/books.js');

const router = express.Router();

router.post('/add-book', postBook); //add book to user
router.get('/books', getBooks); //all books
//TODO: add all endpoints here

module.exports = router;