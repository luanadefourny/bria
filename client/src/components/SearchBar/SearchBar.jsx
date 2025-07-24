import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';
import { getBooksBySearch } from '../../services/apiService.js';
import { postBook } from '../../services/bookService.js';

function SearchBar () {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const containerRef = useRef(null);

  async function handleSubmit (e) {
    e.preventDefault();
    const newSearch = await getBooksBySearch(searchString); // returns array of books from search string
    // console.log(newSearch);
    setSearchResults(newSearch);
    setSearchString('');
  }

  function handleSearchChange (e) {
    const str = e.target.value;
    setSearchString(str);
  }
  
  async function handleSearchAddClick (book) {
    try {
      const newBook = await postBook(book);
      console.log('Book added successfulle: ', newBook);
    } catch (error) {
      console.log('Failed to add book: ', error);
    }

  }

  // clear the results from the search if i click anywhere other than the search container
  useEffect(() => {
    function handleClickOutside (e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setSearchResults([]);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="searchBar-container" ref={ containerRef }>
      <form className="searchbar-form" onSubmit={ handleSubmit }>
        <input 
          className="searchbar-search-input"
          type="search" 
          name="searchBar" 
          placeholder="search for a book..." 
          value={searchString} 
          onChange={ handleSearchChange}></input>
        <button className="searchbar-button" type="submit">Search</button>
      </form>

      {searchResults.length > 0 && (
        <div className="search-results-container">
          {searchResults.map((book, index) => (
            <div key={index} className="search-result-item">

              <div className="search-result-item-book-details">
                {book.cover_i && (
                <img 
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`} 
                  alt={`Cover of ${book.title}`} 
                  className="search-result-cover"
                />
                )}
                <div className="search-result-text">
                  <strong>{book.title}</strong>
                  {book.author_name && <span> by {book.author_name.join(', ')}</span>}
                </div>
              </div>
              <button className="search-result-add-button" onClick={() => handleSearchAddClick(book)}>+</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;