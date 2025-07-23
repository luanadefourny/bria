const mongoose = require('mongoose');

module.exports = [
  {
    _id: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0011'),
    userId: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4b0001'),
    title: 'All',
    description: 'Books read, owned and want to get to'
  },
  {
    _id: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0001'),
    userId: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4b0001'),
    title: 'Read',
    description: 'Books I’ve finished'
  },
  {
    _id: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0002'),
    userId: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4b0001'),
    title: 'Want to Read',
    description: 'Books I want to get to'
  },
  {
    _id: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4c0003'),
    userId: new mongoose.Types.ObjectId('64a0c0b0c3f8fa2d1e4b0001'),
    title: 'Owned',
    description: 'Books I physically or digitally own'
  }
];