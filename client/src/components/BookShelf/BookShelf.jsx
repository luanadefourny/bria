import './BookShelf.css';
import Book from '../Book/Book';

function BookShelf ({ title, books }) {
  return (
    <div className="bookShelf-container">
      <div className="bookshelf-title">{title}</div>
      <div className="book-list">
        {books.map(userBook => (
          <Book key={userBook._id} book={ userBook } type="shelf" />
          // <div key={userBook._id} className="book">
          //   <p>{userBook.bookId.title}</p>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;