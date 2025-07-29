'use strict';

const UserBook = require('./../models/userBooks.js');

const DEFAULT_USER_ID = '64a0c0b0c3f8fa2d1e4b0001';

async function getUserBooks (req, res) {
  try {
    const userBooks = await UserBook.find({ userId: DEFAULT_USER_ID }).populate('bookId');
    console.log('userBooks in getuserbooks userbooks controller: ',userBooks);
    res.status(201).json(userBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong when retrieving from the database - getUserBooks'})
  }
}

module.exports = { getUserBooks };