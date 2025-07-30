import './BookPopup.css';
import { getBookCover } from '../../services/apiService';
import { useState, useEffect } from 'react';
import { updateStatus, updateOwned, updateFavorite, updateProgress, updateFormat, updateShelves } from '../../services/userBookService';
import Checkbox from '@mui/material/Checkbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const OWNED_SHELF_ID = '64a0c0b0c3f8fa2d1e4c0003'; //TODO should not be hardcoded
const READ_SHELF_ID = '64a0c0b0c3f8fa2d1e4c0001'; //TODO should not be hardcoded


function BookPopup ({ book, setBooks }) {

  const { bookId, status: initialStatus, owned:initialOwned, favorite: initialFavorite, format: initialFormats, progress } = book;
  const [formats, setFormats] = useState(new Set(initialFormats));
  const [status, setStatus] = useState(initialStatus);
  const [owned, setOwned] = useState(initialOwned);
  const [favorite, setFavorite] = useState(initialFavorite);
  const [currentPage, setCurrentPage] = useState(progress || 0);
  // const [currentPage, setCurrentPage] = useState(Math.round((progress / 100) * (bookId.pages || 1)));

  useEffect(() => {
    setBooks(prev => 
      prev.map(item => 
        item._id === book._id 
        ? { ...item, status, owned, favorite, progress: currentPage, format: Array.from(formats) } 
        : item))
  }, [status, owned, favorite, currentPage, formats])

  useEffect(() => {
    updateStatus(book._id, status);
    setBooks(prev =>
      prev.map(item => {
        if (item._id !== book._id) return item;

        const newShelfIds = new Set(item.shelfIds);
        if (status === 'read') newShelfIds.add(READ_SHELF_ID);
        else newShelfIds.delete(READ_SHELF_ID);

        // Also update shelves in backend
        updateShelves(book._id, Array.from(newShelfIds));

        return {
          ...item,
          shelfIds: Array.from(newShelfIds),
        };
      })
    );
  }, [status]);
  useEffect(() => {
    updateOwned(book._id, owned);
    setBooks(prev =>
      prev.map(item => {
        if (item._id !== book._id) return item;

        const newShelfIds = new Set(item.shelfIds);
        if (owned) newShelfIds.add(OWNED_SHELF_ID);
        else newShelfIds.delete(OWNED_SHELF_ID);

        // Also update shelves in backend
        updateShelves(book._id, Array.from(newShelfIds));

        return {
          ...item,
          shelfIds: Array.from(newShelfIds),
        };
      })
    );
  }, [owned]);
  useEffect(() => {
    updateFavorite(book._id, favorite);
  }, [favorite]);
  useEffect(() => {
    updateProgress(book._id, currentPage);
  }, [currentPage])
  useEffect(() => {
    updateFormat(book._id, Array.from(formats))
  }, [Array.from(formats).sort().join(',')])

  const toggleFormat = (fmt) => {
    const newFormats = new Set(formats);
    newFormats.has(fmt) ? newFormats.delete(fmt) : newFormats.add(fmt);

    if (newFormats.size === 0) {
      newFormats.add('');
    } else {
      newFormats.delete('');
    }    

    setFormats(newFormats);
  };

  const handlePageChange = (e) => {
    const page = parseInt(e.target.value);
    setCurrentPage(page);
  };

  const displayProgress = bookId.pages
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

        <label>
          status
          <FormControl  sx={{ alignSelf: 'flex-end', width: 150, mt: 2 }}>
            {/* <InputLabel id="status-label" sx={{color:'141204'}}>Status</InputLabel> */}
            <Select
              labelId="status-label"
              value={status}
              // label="Status"
              onChange={(e) => setStatus(e.target.value)}
              sx={{ backgroundColor: '#f5f5f5', '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#d66b1f'}}}
            >
              <MenuItem value="not reading">Not Reading</MenuItem>
              <MenuItem value="reading">Reading</MenuItem>
              <MenuItem value="read">Read</MenuItem>
            </Select>
          </FormControl>
        </label>


        <label>
          owned:
          <Checkbox
            checked={owned}
            onChange={() => setOwned(!owned)}
            sx={{ color: 'grey', '&.Mui-checked': { color: '#d66b1f' } }}
          />
        </label>

        <label>
          favorite:
          <Checkbox
            checked={favorite}
            onChange={() => setFavorite(!favorite)}
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
            sx={{ color: 'grey', '&.Mui-checked': {color:'#d66b1f'}}}
          />
        </label>

        {owned && (
          <fieldset className="format-group">
            <legend>format:</legend>
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
        )}

        {status === 'reading' && (
          <>
            <label>
              page:
              <input
                type="number"
                min={0}
                max={bookId.pages || 9999}
                value={currentPage}
                onChange={handlePageChange}
              />
            </label>

            <label>
              progress:
              <progress value={displayProgress} max="100" />
              <span> {Math.round(displayProgress)}%</span>
            </label>
          </>
        )}

        <Button
          onClick={() => console.log('delete book')}
          sx={{
            minWidth: 0,
            padding: '8px',
            color: '#d66b1f',
            '&:hover': { color: '#a65217', backgroundColor: 'transparent' }
          }}
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
}

export default BookPopup;