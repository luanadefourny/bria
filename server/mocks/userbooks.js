const mongoose = require('mongoose');

module.exports = [
  {
    _id: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4d0001'),
    userId: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4b0001'),
    bookId: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4b1001'), // The Odyssey
    shelfIds: [
      new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0011'), // All
      new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0001'), // Read
      new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0003')  // Owned
    ],
    progress: 354,
    read: true,
    owned: true,
    reads: [
      {
        dateStarted: new Date('2022-01-10'),
        dateCompleted: new Date('2022-02-10'),
        rating: 4,
        notes: 'Classic and immersive.'
      }
    ],
    readCount: 1
  },
  {
    _id: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4d0002'),
    userId: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4b0001'),
    bookId: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4b1002'), // Zen
    shelfIds: [
      new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0011'), // All
      new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0002'), // Want to Read
      new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0003')  // Owned
    ],
    progress: 35,
    read: false,
    owned: true,
    reads: [],
    readCount: 0
  }
];