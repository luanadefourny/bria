'use strict';

const UserBook = require('./../models/userBooks.js');

const DEFAULT_USER_ID = '64a0c0b0c3f8fa2d1e4b0001';

async function getUserBooks (req, res) {
  try {
    const userBooks = await UserBook.find({ userId: DEFAULT_USER_ID })
      .sort({ createdAt: -1 })
      .populate('bookId');
    console.log('userBooks in getuserbooks userbooks controller: ',userBooks);
    res.status(201).json(userBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong when retrieving from the database - getUserBooks'})
  }
}

async function updateUserBookStatus (req, res) {
  const { bookId } = req.params;
  const status = req.body;
  console.log(bookId);
  console.log(status);
  try {
    const updatedBook = await UserBook.findByIdAndUpdate(bookId, status, {new: true});
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
}

async function updateUserBookOwned (req, res) {
  const { bookId } = req.params;
  const owned = req.body;
  console.log(bookId);
  console.log(owned);
  try {
    const updatedBook = await UserBook.findByIdAndUpdate(bookId, owned, {new: true});
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
}

async function updateUserBookFavorite (req, res) {
  const { bookId } = req.params;
  const favorite = req.body;
  console.log(bookId);
  console.log(favorite);
  try {
    const updatedBook = await UserBook.findByIdAndUpdate(bookId, favorite, {new: true});
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
}

async function updateUserBookProgress (req, res) {
  const { bookId } = req.params;
  const progress = req.body;
  console.log(bookId);
  console.log(progress);
  try {
    const updatedBook = await UserBook.findByIdAndUpdate(bookId, progress, {new: true});
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
}
async function deleteUserBook (req, res) {
  const {bookId } = req.params;
  try {
    const bookToDelete = await UserBook;
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
}

module.exports = { 
  getUserBooks, 
  updateUserBookStatus, 
  updateUserBookOwned, 
  updateUserBookFavorite, 
  updateUserBookProgress 
};