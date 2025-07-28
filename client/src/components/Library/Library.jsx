import './Library.css';
import NavBar from '../NavBar/NavBar';
import Book from '../Book/Book';

function Library ({ books, setBooks }) {
  return (
    <div className="library-containter">
      <NavBar books={ books } setBooks={ setBooks } />
      <div className="library-books-container">
        {books?.map(userBook => (
          <Book key={userBook._id} book={ userBook } type="library" />
        ))}
      </div>
    </div>
  );
}

export default Library;