import { useState } from 'react';
import './../AddBook/AddBook.css';
import { postBook } from '../../services/bookService';

function AddBookManual ({ books, setBooks }) {

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [pages, setPages] = useState(0);
  const [format, setFormat] = useState([]);
  // const [bookData, setBookData] = useState({
  //   title: title,
  //   authors: authors,
  //   isbn: isbn,
  //   pages: pages,
  //   format: format,
  // });

  async function handleSubmit (e) {
    e.preventDefault();
    try {
    //   setBookData({
    //     title: title,
    //     authors: authors,
    //     isbn: isbn,
    //     pages: pages,
    //     format: format
    //   })
    //   console.log(bookData);
    //   const newBook = await postBook(bookData)
      const bookToSubmit = {
        title,
        authors: authors.split(', ').map(str => str.trim()),
        isbn: isbn.trim() === '' ? undefined : isbn.trim(),
        pages,
        userData: { format }
      };
      console.log(bookToSubmit);
      const newBook = await postBook(bookToSubmit);
      setBooks(oldBooks => [...oldBooks, newBook]);
      console.log('new book manual: ', newBook);
      //reset everything
      setTitle('');
      setAuthors([]);
      setIsbn('');
      setPages(0);
      setFormat([]);
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
  function handlePagesChange (e) {
    const str = e.target.value;
    setPages(str);
  }
  // function handleFormatChange (e) {
  //   const arr = e.target.value;
  //   console.log(arr);
  //   setFormat(arr)
  // }

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
        <label className="form-input-label">author(s)</label>
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
        <label className="form-input-label">pages</label>
        <input 
          className="form-input-input" 
          type="number" 
          placeholder="page count"
          value={pages}
          onChange={handlePagesChange} />
      </div>
      <div className="addbook-form-input-container">
        <label className="form-input-label">format (only if owned)</label>
        <div className="checkbox-group">
          {['physical', 'kindle', 'audiobook'].map(option => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={format.includes(option)}
                onChange={e => {
                  const value = e.target.value;
                  setFormat(prev =>
                    prev.includes(value)
                      ? prev.filter(item => item !== value)
                      : [...prev, value]
                  );
                }}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddBookManual;