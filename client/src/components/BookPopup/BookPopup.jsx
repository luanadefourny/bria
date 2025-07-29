import './BookPopup.css';
import { getBookCover } from '../../services/apiService';
import { useState } from 'react';

function BookPopup ({ book }) {

  const { bookId, status: initialStatus, owned, favorite, format: initialFormats, progress } = book;
  const [formats, setFormats] = useState(new Set(initialFormats));
  const [status, setStatus] = useState(initialStatus);
  const [currentPage, setCurrentPage] = useState(Math.round((progress / 100) * (bookId.pages || 1)));

  const toggleFormat = (fmt) => {
    const newFormats = new Set(formats);
    newFormats.has(fmt) ? newFormats.delete(fmt) : newFormats.add(fmt);
    setFormats(newFormats);
  };

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value);
    setCurrentPage(page);
  };

  const calculatedProgress = bookId.pages
    ? Math.min((currentPage / bookId.pages) * 100, 100)
    : 0;

  return (
    // <div className="bookPopup-container">
    //   <img className="book-popup-cover-container" src={getBookCover(book.bookId.cover, 'M')} alt={`cover of ${book.bookId.title}`} />
    //   <div className="book-popup-details-container">
    //     <div>{book.bookId.title}</div>
    //     <div>{book.bookId.authors?.join(', ')}</div>
    //   </div>
    // </div>
    <div className="bookPopup">
      <img className="popup-cover" src={getBookCover(bookId.cover, 'L')} alt={`Cover of ${bookId.title}`} />
      <div className="popup-info">
        <h2>{bookId.title}</h2>
        <h3>{bookId.authors.join(', ')}</h3>
        <p>{bookId.description}</p>
        <p className="book-meta">
          {bookId.pages} pages • {bookId.publishedDate?.split('T')[0]} • {bookId.genres?.join(', ')}
        </p>

        <label>Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="not reading">Not Reading</option>
            <option value="reading">Reading</option>
            <option value="read">Read</option>
          </select>
        </label>

        <label>
          Owned:
          <input type="checkbox" defaultChecked={owned} />
        </label>

        <label>
          Favorite:
          <input type="checkbox" defaultChecked={favorite} />
        </label>

        <fieldset className="format-group">
          <legend>Format:</legend>
          {['physical', 'kindle', 'audiobook'].map((fmt) => (
            <label key={fmt}>
              <input
                type="checkbox"
                checked={formats.has(fmt)}
                onChange={() => toggleFormat(fmt)}
              />
              {fmt}
            </label>
          ))}
        </fieldset>

        {status === 'reading' && (
          <>
            <label>
              Page:
              <input
                type="number"
                min={0}
                max={bookId.pages || 9999}
                value={currentPage}
                onChange={handlePageChange}
              />
            </label>

            <label>
              Progress:
              <progress value={calculatedProgress} max="100" />
              <span> {Math.round(calculatedProgress)}%</span>
            </label>
          </>
        )}

        <button className="delete-btn">🗑️ Remove Book</button>
      </div>
    </div>
  );
}

export default BookPopup;