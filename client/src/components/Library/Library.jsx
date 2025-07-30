import './Library.css';
import Book from '../Book/Book';
import Popup from 'reactjs-popup';
import { getBookCover } from '../../services/apiService';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Library ({ books, setBooks }) {
  return (
    <div className="library-containter">
      <div className="library-inner-container">
        <div className="library-books-container">
          {books?.map(userBook => (
            <Popup key={userBook._id} trigger={<img src={getBookCover(userBook.bookId.cover, 'M')} alt={`cover of ${userBook.bookId.title}`} />} modal contentStyle={{width:'65%', height:'60%'}}>
              <Book book={ userBook } setBooks={setBooks} type="library-popup" />
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
    </div>
  );
}

export default Library;