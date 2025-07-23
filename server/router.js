'use strict';

const express = require('express');
const { getBooks } = require('./controllers/books.js');

const router = express.Router();

router.get('/books', getBooks); //all books
//TODO: add all endpoints here

module.exports = router;