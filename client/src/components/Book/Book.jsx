import { getBookCover } from '../../services/apiService';
import './Book.css';

function Book ({ book, type }) {
  return (
    <div className={`book-${type}-container`}>
      {type === 'shelf' && (
        <div className="book-details-shelf-container">
          <img src={getBookCover(book.bookId.cover, 'M')} alt={`cover of ${book.bookId.title}`} />
        </div>
      )}
      {type === 'library' && (
        <div className="book-details-library-container">
          <img src={getBookCover(book.bookId.cover, 'M')} alt={`cover of ${book.bookId.title}`} />
          <div>{book.bookId.title}</div>
          <div>{book.bookId.authors?.join(', ')}</div>
        </div>
      )}
    </div>
  );
};

export default Book;