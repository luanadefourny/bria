import { useState } from 'react';
import './../AddBook/AddBook.css';
import { postBook } from '../../services/bookService';

function AddBookManual () {

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [bookData, setBookData] = useState({
    title: title,
    authors: authors,
    isbn: isbn,
    publishedDate: publishedDate
  });

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      setBookData({
        title: title,
        authors: authors,
        isbn: isbn,
        publishedDate: publishedDate
      })
      const newBook = await postBook(bookData)
      console.log('new book manual: ', newBook);
      //reset everything
      setTitle('');
      setAuthors([]);
      setIsbn('');
      setPublishedDate('');
    } catch (error) {
      console.log(error);
    }
  }

  //TODO: could refactor to make one function that also takes the set function as parameter
  function handleTitleChange (e) {
    const str = e.target.value;
    setTitle(str);
  }
  function handleAuthorsChange (e) {
    const arr = e.target.value;
    setAuthors(arr);
  }
  function handleIsbnChange (e) {
    const str = e.target.value;
    setIsbn(str);
  }
  function handlePublishedDateChange (e) {
    const str = e.target.value;
    setPublishedDate(str);
  }

  return (
    <form 
      className="addbook-form-container manual-form"
      onSubmit={handleSubmit} >
      <div className="addbook-form-input-container">
        <label className="form-input-label">title</label>
        <input 
          className="form-input-input" 
          type="text" 
          placeholder="book title" 
          required
          value={title}
          onChange={handleTitleChange} />
      </div>
      <div className="addbook-form-input-container">
        <label className="form-input-label">author</label>
        <input 
          className="form-input-input" 
          type="text" 
          placeholder="author(s)" 
          required 
          value={authors}
          onChange={handleAuthorsChange} />
      </div>
      <div className="addbook-form-input-container">
        <label className="form-input-label">isbn</label>
        <input 
          className="form-input-input" 
          type="text" 
          placeholder="isbn"
          value={isbn}
          onChange={handleIsbnChange} />
      </div>
      <div className="addbook-form-input-container">
        <label className="form-input-label">published year</label>
        <input 
          className="form-input-input" 
          type="text" 
          placeholder="year"
          value={publishedDate}
          onChange={handlePublishedDateChange} />
      </div>
      {/* <div className="addbook-form-input-container">
        <label className="form-input-label"></label>
        <input className="form-input-input" />
      </div> */}
      <button type="submit">Add</button>
    </form>
  );
}

export default AddBookManual;