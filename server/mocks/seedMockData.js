require('dotenv').config();

const mongoose = require('mongoose');
const Book = require('../models/books');
const UserBook = require('../models/userBooks');
const Shelf = require('../models/shelves');
const User = require('../models/users');

const userId = new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4b0001');
const shelfIds = {
  all: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0011'),
  read: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0001'),
  want: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0002'),
  owned: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0003'),
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
  // await mongoose.connect('mongodb://localhost:27017/bria_mocks'); // adjust as needed
  const uri = process.env.USE_MOCK_DB === 'true'
    ? process.env.MONGO_URI_MOCK
    : process.env.MONGO_URI;

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
  // await mongoose.connect('mongodb://localhost:27017/bria_mocks'); // adjust as needed

  // Seed User and Shelf collections
  const user = {
    _id: userId,
    username: 'luanadefourny',
    email: 'luanadefourny@gmail.com',
  };

    const shelvesList = [
    {
      _id: shelfIds.all,
      userId,
      title: 'All',
      description: 'Books read, owned and want to get to'
    },
    {
      _id: shelfIds.read,
      userId,
      title: 'Read',
      description: 'Books I’ve finished'
    },
    {
      _id: shelfIds.want,
      userId,
      title: 'Want to Read',
      description: 'Books I want to get to'
    },
    {
      _id: shelfIds.owned,
      userId,
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
      userId,
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