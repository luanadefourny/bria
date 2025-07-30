import { getBookCover } from '../../services/apiService';
import BookPopup from '../BookPopup/BookPopup';
import './Book.css';

function Book ({ book, type, setBooks }) {

  function handleClick (e) {

  }

  return (
    <div className={`book-${type}-container`}>
      {type === 'shelf' && (
        <div className="book-details-shelf-container">
          <img src={getBookCover(book.bookId.cover, 'M')} alt={`cover of ${book.bookId.title}`} onClick={handleClick} />
        </div>
      )}

      {type === 'library-popup' && (
        <BookPopup book={ book } setBooks={ setBooks }/>
      )}

      {type === 'pick' && (
        <div className="book-pick-container">
          <img className="book-library-cover-container" src={getBookCover(book.bookId.cover, 'M')} alt={`cover of ${book.bookId.title}`} />
          {/* <div className="book-library-details-container">
            <div>{book.bookId.title}</div>
            <div>{book.bookId.authors?.join(', ')}</div>
            </div> */}
        </div>
      )}

      {type === 'current' && (
        <div className="book-current-container">
          <img className="book-library-cover-container" src={getBookCover(book.bookId.cover, 'M')} alt={`cover of ${book.bookId.title}`} />
          <div className="book-current-title">{book.bookId.title}</div>
        </div>
      )}
    </div>
  );
};

export default Book;