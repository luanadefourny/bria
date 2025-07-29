import Book from '../Book/Book';
import './CurrentlyReading.css';
import Popup from 'reactjs-popup';

function CurrentlyReading ({books=[], setBooks}) {

  const currentlyReading = books.filter(book => book.status === 'reading');
  function updateProgress (book) {
    const page = book.progress || 0;
    const totalPages = book.bookId.pages || 1;
    const percentage = Math.min((page / totalPages) * 100, 100);
    return (
      <label className="currentlyReading-progress-container">
        <progress value={percentage} max="100" />
        <span> {Math.round(percentage)}%</span>
      </label>
    )
  }
  return (
    <div className="currentlyReading-container">
      <div className="currentlyReading-title">currently reading</div>
      {currentlyReading.map(book => (
        <div key={book._id} className="currentlyReading-book-container">
          <Popup key={book._id} trigger={
            <div className="book">
              <Book book={book} type="current" />
            </div>
          } 
          modal
          contentStyle={{width:'55%', height:'50%'}}
          >
            <Book book={book} setBooks={setBooks} type="library-popup" />
          </Popup>
          {/* <Book book={book} setBooks={setBooks} type="current"/> */}
          {updateProgress(book)}
        </div>
      ))}
    </div>
  );
};

export default CurrentlyReading;