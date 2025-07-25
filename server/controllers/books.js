'use strict';

const Book = require('./../models/books.js');
const UserBook = require('./../models/userBooks.js');

const DEFAULT_USER_ID = '64a0c0b0c3f8fa2d1e4b0001';

async function postBook (req, res) {
  console.log('req body: ', req.body);
  const {
    title,
    authors,
    isbn,
    cover,
    worksKey,
    editionKey,
    pages,
    publishedDate,
    description,
    // genres,
    // rating,
  } = req.body;


  try {
    let book = await Book.findOne({ isbn: isbn });
    // no book is found for this isbn then add it
    if (!book) {
      // console.log('final book object before saving: ', book);
      book = await Book.create({
        title,
        authors,
        isbn,
        cover,
        worksKey,
        editionKey,
        pages,
        publishedDate,
        description,
        // genres,
        // rating,
      });
    }

    //add book for the user as well
    let userBook = await UserBook.findOne({ userId: DEFAULT_USER_ID, bookId: book._id });
    if (!userBook) {
      userBook = await UserBook.create({
        userId: DEFAULT_USER_ID,
        bookId: book._id,
        shelfIds: ['64a0c0b0c3f8fa2d1e4c0011', '64a0c0b0c3f8fa2d1e4c0002'],
      })
    }

    res.status(201).json({ book, userBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong when adding to the database - postBook'});
  }
}

async function getBooks (req, res) {
  try {
    
  } catch (error) {
    
  }
}

module.exports = { postBook, getBooks };