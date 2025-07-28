'use strict';

const express = require('express');
const { postBook } = require('./controllers/books.js');
const { getUserBooks } = require('./controllers/userBooks.js');

const router = express.Router();

router.post('/books', postBook); //add book to user
router.get('/books', getUserBooks); //all books
//TODO: add all endpoints here

module.exports = router;