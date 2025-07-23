// seed.js
const mongoose = require('./db.js');
const User = require('./models/users.js');
const Book = require('./models/books.js');
const Shelf = require('./models/shelves.js');
const UserBook = require('./models/userBooks.js');

const users = require('./mocks/users.js');
const books = require('./mocks/books.js');
const shelves = require('./mocks/shelves.js');
const userBooks = require('./mocks/userBooks.js');

async function seed() {
  await mongoose.connection.dropDatabase();

  await User.insertMany(users);
  await Book.insertMany(books);
  await Shelf.insertMany(shelves);
  await UserBook.insertMany(userBooks);

  console.log('Mock data seeded!');
  mongoose.connection.close();
}

seed();