import './BookShelf.css';
import Book from '../Book/Book';
import Popup from 'reactjs-popup';


function BookShelf ({ title, books, setBooks }) {
  return (
    <div className="bookShelf-container">
      <div className="bookshelf-title">{title}</div>
      <div className="book-list">
        {books.map(userBook => (
          <Popup key={userBook._id} trigger={
            <div className="book">
              <Book book={userBook} type="shelf" />
            </div>
          } 
          modal
          contentStyle={{width:'65%', height:'60%'}}
          >
            <Book book={userBook} setBooks={setBooks} type="library-popup" />
          </Popup>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;