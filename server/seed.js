// seed.js
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('./db.js');
const User = require('./models/users.js');
const Book = require('./models/books.js');
const Shelf = require('./models/shelves.js');
const UserBook = require('./models/userBooks.js');
const mockShelvesRaw = require('./mocks/mockBria.shelves.json');

const mockShelves = mockShelvesRaw.map(shelf => ({
  ...shelf,
  _id: shelf._id?.$oid,
  userId: shelf.userId?.$oid,
  createdAt: shelf.createdAt ? new Date(shelf.createdAt.$date) : undefined,
  updatedAt: shelf.updatedAt ? new Date(shelf.updatedAt.$date) : undefined
}));


// const users = require('./mocks/users.js');
// const books = require('./mocks/books.js');
// const shelves = require('./mocks/shelves.js');
// const userBooks = require('./mocks/userBooks.js');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const GOODREADS_CSV_PATH = path.join(__dirname, '../Goodreads Library Export.csv');

// Replace with your actual IDs
const userId = process.env.USER_ID;
const allShelfId = process.env.ALL_SHELF_ID;
const wantShelfId = process.env.WANT_SHELF_ID;
const readShelfId = process.env.READ_SHELF_ID;
const ownedShelfId = process.env.OWNED_SHELF_ID;

const BAD_READ_SHELF_ID = '64a0c0b0c3f8fa2d1e4b0001'; // user ID mistakenly used

async function fixReadShelfId() {
  const booksToFix = await UserBook.find({ read: true, shelfIds: BAD_READ_SHELF_ID });

  for (const userBook of booksToFix) {
    const updatedShelfIds = userBook.shelfIds.map(id =>
      id.toString() === BAD_READ_SHELF_ID ? readShelfId : id
    );

    await UserBook.findByIdAndUpdate(userBook._id, { shelfIds: updatedShelfIds });
    console.log(`🔧 Fixed shelf ID for: ${userBook._id}`);
  }
}


const readCSV = (filePath) =>
  new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });

// async function importGoodreads() {
//   const rows = await readCSV(GOODREADS_CSV_PATH);

//   for (const row of rows) {
//     const isbn = row.ISBN?.replace(/="/g, '').replace(/"/g, '').trim() || '';
//     const isbn13 = row.ISBN13?.replace(/="/g, '').replace(/"/g, '').trim() || '';

//     let book = await Book.findOne({ $or: [{ isbn }, { isbn: isbn13 }] });

//     if (!book) {
//       book = await Book.create({
//         isbn,
//         title: row.Title,
//         authors: [row.Author],
//         pages: parseInt(row['Number of Pages']) || undefined,
//         publishedDate: row['Year Published'] ? new Date(`${row['Year Published']}-01-01`) : undefined,
//         rating: parseFloat(row['Average Rating']) || undefined,
//       });
//     }

//     const shelfIds = [allShelfId];
//     if (row['Exclusive Shelf'] === 'read' && readShelfId) shelfIds.push(readShelfId);
//     else shelfIds.push(wantShelfId);

//     await UserBook.create({
//       userId,
//       bookId: book._id,
//       shelfIds,
//       progress: 0,
//       reads: row['My Rating'] || row['Date Read'] ? [{
//         dateStarted: null,
//         dateCompleted: row['Date Read'] ? new Date(row['Date Read']) : null,
//         rating: parseInt(row['My Rating']) || 0,
//         notes: null
//       }] : [],
//       readCount: parseInt(row['Read Count']) || 0,
//       read: row['Exclusive Shelf'] === 'read',
//       favorite: false,
//       status: row['Exclusive Shelf'] === 'read'
//         ? 'read'
//         : row['Exclusive Shelf'] === 'currently-reading'
//           ? 'reading'
//           : 'not reading',
//       format: ['']
//     });
//   }

//   console.log('Goodreads data imported!');
// }




// async function seed() {
//   await mongoose.connection.dropDatabase();

//   await User.findOneAndUpdate(
//     { _id: userId },
//     {
//       _id: userId,
//       username: 'luana',
//       email: 'luana@example.com'
//     },
//     { upsert: true, new: true }
//   );

//   await importGoodreads();
// }


// async function updateBooksFromOpenLibrary() {
//   // await mongoose.connect();

//   const books = await Book.find({ isbn: { $ne: null }, cover: { $exists: false } });

//   for (const book of books) {
//     try {
//       const url = `https://openlibrary.org/isbn/${book.isbn}.json`;
//       const res = await fetch(url);
//       if (!res.ok) continue;

//       const data = await res.json();

//       const coverId = data.covers?.[0];
//       const worksKey = data.works?.[0]?.key || null;
//       const editionKey = data.key || null;

//       await Book.findByIdAndUpdate(book._id, {
//         cover: coverId,
//         worksKey,
//         editionKey,
//         description,
//       });

//       console.log(`✅ Updated: ${book.title}`);
//     } catch (err) {
//       console.error(`❌ Error with ${book.title}:`, err.message);
//     }
//   }

//   mongoose.connection.close();
// }

// async function updateDescriptionAndReadShelves() {
//   const userBooks = await UserBook.find({}).populate('bookId');

//   for (const userBook of userBooks) {
//     const updates = {};

//     // Add read shelf if missing
//     if (userBook.read && !userBook.shelfIds.includes(readShelfId)) {
//       userBook.shelfIds.push(readShelfId);
//       updates.shelfIds = userBook.shelfIds;
//     }

//     // Fetch description if missing
//     const book = userBook.bookId;
//     if (!book.description && book.isbn) {
//       try {
//         const openLibRes = await fetch(`https://openlibrary.org/isbn/${book.isbn}.json`);
//         if (openLibRes.ok) {
//           const openLibData = await openLibRes.json();
//           const worksKey = openLibData.works?.[0]?.key;
//           if (worksKey) {
//             const worksRes = await fetch(`https://openlibrary.org${worksKey}.json`);
//             if (worksRes.ok) {
//               const worksData = await worksRes.json();
//               const description = typeof worksData.description === 'string'
//                 ? worksData.description
//                 : worksData.description?.value || null;

//               if (description) {
//                 await Book.findByIdAndUpdate(book._id, { description });
//                 console.log(`📖 Updated description for: ${book.title}`);
//               }
//             }
//           }
//         }
//       } catch (err) {
//         console.error(`❌ Failed to update description for ${book.title}:`, err.message);
//       }
//     }

//     if (Object.keys(updates).length) {
//       await UserBook.findByIdAndUpdate(userBook._id, updates);
//       console.log(`✅ Updated UserBook for: ${book.title}`);
//     }
//   }
//   mongoose.connection.close();
// }

// updateBooksFromOpenLibrary();
// updateDescriptionAndReadShelves();

// seed();


async function importGoodreads() {
  const rows = await readCSV(GOODREADS_CSV_PATH);

  for (const row of rows) {
    const isbn = row.ISBN?.replace(/="/g, '').replace(/"/g, '').trim() || '';
    const isbn13 = row.ISBN13?.replace(/="/g, '').replace(/"/g, '').trim() || '';

    let book = await Book.findOne({ $or: [{ isbn }, { isbn: isbn13 }] });

    if (!book) {
      let cover, worksKey, editionKey, description;

      try {
        const res = await fetch(`https://openlibrary.org/isbn/${isbn || isbn13}.json`);
        if (res.ok) {
          const data = await res.json();
          cover = data.covers?.[0];
          worksKey = data.works?.[0]?.key;
          editionKey = data.key;

          if (worksKey) {
            const worksRes = await fetch(`https://openlibrary.org${worksKey}.json`);
            if (worksRes.ok) {
              const worksData = await worksRes.json();
              description = typeof worksData.description === 'string'
                ? worksData.description
                : worksData.description?.value || null;
            }
          }
        }
      } catch (err) {
        console.error(`❌ Error fetching Open Library data for ${row.Title}`, err.message);
      }

      book = await Book.create({
        isbn,
        isbn13,
        title: row.Title,
        authors: [row.Author],
        pages: parseInt(row['Number of Pages']) || undefined,
        publishedDate: row['Year Published'] ? new Date(`${row['Year Published']}-01-01`) : undefined,
        rating: parseFloat(row['Average Rating']) || undefined,
        cover,
        worksKey,
        editionKey,
        description
      });
    }

    const shelfIds = [allShelfId];

    if (row['Exclusive Shelf'] === 'read') {
      shelfIds.push(readShelfId);
    } else {
      shelfIds.push(wantShelfId);
    }

    if (parseInt(row['Owned Copies']) > 0) {
      shelfIds.push(ownedShelfId);
    }

    await UserBook.create({
      userId,
      bookId: book._id,
      shelfIds,
      progress: 0,
      reads: row['My Rating'] || row['Date Read'] ? [{
        dateStarted: null,
        dateCompleted: row['Date Read'] ? new Date(row['Date Read']) : null,
        rating: parseInt(row['My Rating']) || 0,
        notes: null
      }] : [],
      readCount: parseInt(row['Read Count']) || 0,
      read: row['Exclusive Shelf'] === 'read',
      favorite: false,
      status: row['Exclusive Shelf'] === 'read'
        ? 'read'
        : row['Exclusive Shelf'] === 'currently-reading'
          ? 'reading'
          : 'not reading',
      format: ['']
    });
  }

  console.log('📚 Goodreads books imported');
}

async function seed() {
  // await mongoose.connection.dropDatabase();

  // await User.findOneAndUpdate(
  //   { _id: userId },
  //   {
  //     _id: userId,
  //     username: 'luana',
  //     email: 'luana@example.com'
  //   },
  //   { upsert: true, new: true }
  // );

  // await Shelf.insertMany(mockShelves);
  // console.log('📁 Shelves seeded');

  // await importGoodreads();
  await fixReadShelfId();

  mongoose.connection.close();
}

seed();