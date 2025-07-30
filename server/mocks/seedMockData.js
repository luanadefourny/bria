require('dotenv').config();

const mongoose = require('mongoose');
const Book = require('../models/books');
const UserBook = require('../models/userBooks');
const Shelf = require('../models/shelves');
const User = require('../models/users');

const USER_ID = process.env.USER_ID;

const shelfIds = {
  all: process.env.ALL_SHELF_ID,
  read: process.env.READ_SHELF_ID,
  want: process.env.WANT_SHELF_ID,
  owned: process.env.OWNED_SHELF_ID,
};

function getRandomElements(arr, n) {
  const copy = [...arr];
  const result = [];
  while (result.length < n && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

async function seed() {
  const uri = process.env.MONGO_URI;

  await (async () => {
    try {
      await mongoose.connect(`${uri}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to db ', uri);
    } catch (error) {
      console.log(`Could not connect: ${error}`);
    }
  })();

  // Seed User and Shelf collections
  const user = {
    _id: USER_ID,
    username: 'User 1',
    email: 'user1@test.com',
  };

    const shelvesList = [
    {
      _id: shelfIds.all,
      userId: USER_ID,
      title: 'All',
      description: 'Books read, owned and want to get to'
    },
    {
      _id: shelfIds.read,
      userId: USER_ID,
      title: 'Read',
      description: 'Books I’ve finished'
    },
    {
      _id: shelfIds.want,
      userId: USER_ID,
      title: 'Want to Read',
      description: 'Books I want to get to'
    },
    {
      _id: shelfIds.owned,
      userId: USER_ID,
      title: 'Owned',
      description: 'Books I physically or digitally own'
    }
  ];

  await User.deleteMany({});
  await Shelf.deleteMany({});
  await User.create(user);
  await Shelf.insertMany(shelvesList);



  await Book.deleteMany({});
  await UserBook.deleteMany({});

  const books = [];
  for (let i = 0; i < 100; i++) {
    books.push({
      isbn: `mockisbn${i}`,
      title: `Mock Book ${i}`,
      authors: [`Author ${i}`],
      pages: Math.floor(Math.random() * 500) + 100,
      cover: i,
      publishedDate: new Date(2000 + (i % 20), 0, 1),
      description: `Description for book ${i}`,
      genres: ['fiction', 'drama'],
      rating: Math.round(Math.random() * 5 * 10) / 10
    });
  }

  const createdBooks = await Book.insertMany(books);

  const kindle = getRandomElements(createdBooks, 30);
  const audiobook = getRandomElements(createdBooks.filter(b => !kindle.includes(b)), 30);
  const physical = createdBooks.filter(b => !kindle.includes(b) && !audiobook.includes(b));

  const readBooks = getRandomElements(createdBooks, 20).map(b => b._id.toString());
  const ownedBooks = getRandomElements(createdBooks, 30).map(b => b._id.toString());

  const userBooks = createdBooks.map(book => {
    const formats = [];
    if (kindle.includes(book)) formats.push('kindle');
    if (audiobook.includes(book)) formats.push('audiobook');
    if (physical.includes(book)) formats.push('physical');

    const isRead = readBooks.includes(book._id.toString());
    const isOwned = ownedBooks.includes(book._id.toString());

    const shelfList = [shelfIds.all];
    if (isRead) shelfList.push(shelfIds.read);
    if (isOwned) shelfList.push(shelfIds.owned);
    if (!isRead && !isOwned) shelfList.push(shelfIds.want);

    return {
      userId: USER_ID,
      bookId: book._id,
      shelfIds: shelfList,
      progress: isRead ? 100 : 0,
      read: isRead,
      reads: isRead ? [{
        dateStarted: new Date(2023, 0, 1),
        dateCompleted: new Date(2023, 0, 10),
        rating: Math.floor(Math.random() * 5) + 1,
        notes: `Initial mock read for ${book.title}`
      }] : [],
      readCount: isRead ? 1 : 0,
      owned: isOwned,
      status: isRead ? 'read' : 'not reading',
      format: formats,
    };
  });

  await UserBook.insertMany(userBooks);
  console.log('✅ Mock data seeded');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  mongoose.disconnect();
});