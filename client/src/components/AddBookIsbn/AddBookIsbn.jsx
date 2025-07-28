import { useState } from 'react';
import './../AddBook/AddBook.css';
import { getBookByIsbn } from '../../services/apiService';
import { postBook } from '../../services/bookService';

function AddBookIsbn ({ books, setBooks }) {

  const [isbn, setIsbn] = useState('');
  // const [status, setStatus] = useState('');

  async function handleSubmit (e) {
    console.log('here');
    console.log(isbn);
    e.preventDefault();
    try {
      console.log('in try');
      const searchResults = await getBookByIsbn(isbn);
      console.log('search results: ', searchResults);
      if (!searchResults.numFoundExact) {
        console.log('No results found for this isbn');
        return;
        //TODO: maybe show this error to the user to prompt them to try again
      }
      const book = searchResults.docs[0];
      console.log('book: ', book);
      const newBook = await postBook(book);
      console.log('new book entry: ', newBook);
      setIsbn('')
      //TODO: add validation message for user to know it was added successfully
    } catch (error) {
      console.log(error);
    }
  }
  function handleIsbnChange (e) {
    const str = e.target.value;
    setIsbn(str);
  }

  return (
    <form className="addbook-form-container isbn-form" onSubmit={handleSubmit}>
      <div className="addbook-form-input-container">
        <label className="form-input-label">isbn</label>
        <input 
          className="form-input-input" 
          type="text" 
          placeholder="enter ISBN" 
          value={isbn}
          onChange={handleIsbnChange} ></input>
      </div>
        <button type="submit">Search</button>
    </form>
  );
}

export default AddBookIsbn;