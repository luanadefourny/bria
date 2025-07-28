import { useState } from 'react';

import SearchBar from '../SearchBar/SearchBar';

import './AddBook.css';
import AddBookIsbn from '../AddBookIsbn/AddBookIsbn';
import AddBookManual from '../AddBookManual/AddBookManual';

function AddBook ({ books, setBooks }) {

  const [mode, setMode] = useState(null);

  return (
    <div className="addBook-container">
      <div className="addbook-title-mode-button">
        <h1 className="addbook-title">add book to library</h1>
        
        <div className="addbook-mode-button-container">
          <button className="addbook-mode-button" onClick={() => setMode('search')}>Search</button>
          <button className="addbook-mode-button" onClick={() => setMode('isbn')}>Add by ISBN</button>
          <button className="addbook-mode-button" onClick={() => setMode('manual')}>Enter manually</button>
        </div>
      </div>

      <div className="addbook-mode-container">
        {mode === 'search' && (
          <SearchBar books={ books } setBokos={ setBooks } />
        )}

        {mode === 'isbn' && (
          <AddBookIsbn books={ books } setBokos={ setBooks } />
        )}

        {mode === 'manual' && (
          <AddBookManual books={ books } setBokos={ setBooks } />
        )}
      </div>
    </div>
  );
};

export default AddBook;