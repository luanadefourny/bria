import './Library.css';
import NavBar from '../NavBar/NavBar';
import Book from '../Book/Book';
import Popup from 'reactjs-popup';
import { getBookCover } from '../../services/apiService';

function Library ({ books, setBooks }) {
  return (
    <div className="library-containter">
      {/* <NavBar books={ books } setBooks={ setBooks } /> */}
      <div className="library-books-container">
        {books?.map(userBook => (
          <Popup trigger={<img src={getBookCover(userBook.bookId.cover, 'L')} alt={`cover of ${userBook.bookId.title}`} />} modal >
            <Book key={userBook._id} book={ userBook } type="library-popup" />
          </Popup>
        ))}
      </div>
    </div>
  );
}

export default Library;