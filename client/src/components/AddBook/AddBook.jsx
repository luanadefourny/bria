import { useState } from 'react';

import SearchBar from '../SearchBar/SearchBar';

import './AddBook.css';

function AddBook () {

  const [mode, setMode] = useState(null);

  return (
    <div className="addBook-container">
      <h1 className="addbook-title">add book to library</h1>
      
      <div className="addbook-mode-button-container">
        <button className="addbook-mode-button" onClick={() => setMode('search')}>Search</button>
        <button className="addbook-mode-button" onClick={() => setMode('isbn')}>Add by ISBN</button>
        <button className="addbook-mode-button" onClick={() => setMode('manual')}>Enter manually</button>
      </div>

      {mode === 'search' && (
        <SearchBar />
      )}

      {mode === 'isbn' && (
        <form className="addbook-form-container isbn-form">
          <input type="text" placeholder="enter ISBN"></input>
          <button type="submit">Add</button>
        </form>
      )}

      {mode === 'manual' && (
        <form className="addbook-form-container manual-form">
          <div className="addbook-form-input-container">
            <label className="form-input-label">title</label>
            <input className="form-input-input" type="text" placeholder="book title" required />
          </div>
          <div className="addbook-form-input-container">
            <label className="form-input-label">author</label>
            <input className="form-input-input" type="text" placeholder="author(s)" required />
          </div>
          <div className="addbook-form-input-container">
            <label className="form-input-label">isbn</label>
            <input className="form-input-input" type="text" placeholder="isbn" />
          </div>
          <div className="addbook-form-input-container">
            <label className="form-input-label">published year</label>
            <input className="form-input-input" type="number" placeholder="year" />
          </div>
          <div className="addbook-form-input-container">
            <label className="form-input-label"></label>
            <input className="form-input-input" />
          </div>
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
};

export default AddBook;