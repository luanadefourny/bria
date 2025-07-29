import './BookShelf.css';
import Book from '../Book/Book';
import Popup from 'reactjs-popup';


function BookShelf ({ title, books }) {
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
          contentStyle={{width:'55%', height:'50%'}}
          >
            <Book book={userBook} type="library-popup" />
          </Popup>
        ))}
      </div>
    </div>
  );
};

export default BookShelf;