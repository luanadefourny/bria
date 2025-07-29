import './Shelves.css';
import BookShelf from '../BookShelf/BookShelf';

function Shelves ({books}) {
  return (
    //TODO: change to not hardcode Ids
    <div className="shelves-container">
      <BookShelf 
        title="Want to Read" 
        books={books.filter(book => 
          book.shelfIds.includes('64a0c0b0c3f8fa2d1e4c0002'))} />
      <BookShelf title="Owned"
        books={books.filter(book => 
          book.shelfIds.includes('64a0c0b0c3f8fa2d1e4c0003'))} />
      <BookShelf title="Read"
        books={books.filter(book => 
          book.shelfIds.includes('64a0c0b0c3f8fa2d1e4c0001'))} />
    </div>
  );
};

export default Shelves;