'use strict';

const express = require('express');
const { postBook } = require('./controllers/books.js');
const { 
  getUserBooks, 
  updateUserBookStatus, 
  updateUserBookOwned, 
  updateUserBookFavorite, 
  updateUserBookProgress, 
  updateUserBookFormat,
  updateUserBookShelves
} = require('./controllers/userBooks.js');

const router = express.Router();

router.post('/books', postBook); //add book to user
router.get('/books', getUserBooks); //all books
router.put('/userbooks/:bookId/status', updateUserBookStatus) //update book status
router.put('/userbooks/:bookId/owned', updateUserBookOwned) //update book owned
router.put('/userbooks/:bookId/favorite', updateUserBookFavorite) //update book favorite
router.put('/userbooks/:bookId/progress', updateUserBookProgress) //update book progress
router.put('/userbooks/:bookId/format', updateUserBookFormat) //update book format
router.put('/userbooks/:bookId/shelves', updateUserBookShelves); //update book shelves
//TODO: add all endpoints here

module.exports = router;