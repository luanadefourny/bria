import './Library.css';
import Book from '../Book/Book';
import Popup from 'reactjs-popup';
import { getBookCover } from '../../services/apiService';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Library ({ books, setBooks }) {
  return (
    <div className="library-containter">
      <div className="library-books-container">
        {books?.map(userBook => (
          <Popup key={userBook._id} trigger={<img src={getBookCover(userBook.bookId.cover, 'L')} alt={`cover of ${userBook.bookId.title}`} />} modal >
            <Book book={ userBook } type="library-popup" />
          </Popup>
        ))}
      </div>
      <Zoom in={useScrollTrigger({ threshold: 100 })}>
        <Fab
          // color="primary"
          size="small"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ position: 'fixed', bottom: 32, right: 32, backgroundColor: '#d66b1f', color: '#f5f5f5'}}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </div>
  );
}

export default Library;