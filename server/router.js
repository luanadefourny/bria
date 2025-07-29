'use strict';

const express = require('express');
const { postBook } = require('./controllers/books.js');
const { getUserBooks, updateUserBookStatus, updateUserBookOwned, updateUserBookFavorite, updateUserBookProgress } = require('./controllers/userBooks.js');

const router = express.Router();

router.post('/books', postBook); //add book to user
router.get('/books', getUserBooks); //all books
router.put('/userbooks/:bookId/status', updateUserBookStatus) //update book status
router.put('/userbooks/:bookId/owned', updateUserBookOwned) //update book owned
router.put('/userbooks/:bookId/favorite', updateUserBookFavorite) //update book favorite
router.put('/userbooks/:bookId/progress', updateUserBookProgress) //update book favorite
//TODO: add all endpoints here

module.exports = router;