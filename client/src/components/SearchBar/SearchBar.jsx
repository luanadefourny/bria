import { useState } from 'react';
import './SearchBar.css';
import { getBooksBySearch } from '../../services/apiService.js';

function SearchBar () {
  const [searchString, setSearchString] = useState('');

  async function handleSubmit (e) {
    e.preventDefault();
    const newSearch = await getBooksBySearch(searchString);
    console.log(newSearch);
    setSearchString('');
  }

  function handleSearchChange (e) {
    const str = e.target.value;
    setSearchString(str);
  }

  return (
    <div className="searchBar-container">
      <form className="searchbar-form" onSubmit={ handleSubmit }>
        <input 
          type="search" 
          name="searchBar" 
          placeholder="search for a book..." 
          value={searchString} 
          onChange={ handleSearchChange}></input>
        <button className="searchbar-button" type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;