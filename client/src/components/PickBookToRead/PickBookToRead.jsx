import './../PickBook/PickBook.css';

function PickBookToRead ({getRandomBooks, books, setBooks, setBooksPicked, setMode, reset, readShelfId, ownedShelfId, amount, setAmount, reRead, setReRead, length, setLength, format, setFormat}) {
  
  function handleSubmit (e) {
    e.preventDefault();
    const pickedBooks = pickBooks(books, reRead, format, length, amount, ownedShelfId, readShelfId, getRandomBooks);
    console.log(pickedBooks);
    setBooksPicked(pickedBooks);
    setMode('picked');
    reset();
  }
  
  return (
    <form className="pickbook-form-container" onSubmit={handleSubmit}>
      <div className="pickbook-form-input-container">
        <label className="form-input-label">how many picks would you like?</label>
        <input 
          className="form-input-input" 
          type="range" 
          min="1"
          max="3"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}></input>
      </div>
      <div className="form-input-range">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div className="pickbook-form-input-container">
        <label className="form-input-label">would you like to re-read?*</label>
        <div className="form-input-radio">
          <label className="form-input-radio-label">
            <input
              type="radio"
              name="reRead"
              value="yes"
              checked={reRead === 'yes'}
              onChange={(e) => setReRead(e.target.value)}
            />
            yes
          </label>
          <label className="form-input-radio-label">
            <input
              type="radio"
              name="reRead"
              value="no"
              checked={reRead === 'no'}
              onChange={(e) => setReRead(e.target.value)}
            />
            no
          </label>
          <label className="form-input-radio-label">
            <input
              type="radio"
              name="reRead"
              value="don't care"
              checked={reRead === "don't care"}
              onChange={(e) => setReRead(e.target.value)}
            />
            don't care
          </label>
        </div>
      </div>
      <div className="pickbook-form-input-container">
        <label className="form-input-label">length</label>
        <input 
          className="form-input-input" 
          type="range" 
          min="1"
          max="3"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}></input>
      </div>
      <div className="form-input-range">
        <span>Short</span>
        <span>Medium</span>
        <span>Long</span>
      </div>
      <div className="pickbook-form-input-container">
        <label className="form-input-label">format*</label>
        <div className="form-input-radio">
          <label className="form-input-radio-label">
            <input
              type="radio"
              name="format"
              value="physical"
              checked={format === 'physical'}
              onChange={(e) => setFormat(e.target.value)}
            />
            physical
          </label>
          <label className="form-input-radio-label">
            <input
              type="radio"
              name="format"
              value="kindle"
              checked={format === 'kindle'}
              onChange={(e) => setFormat(e.target.value)}
            />
            kindle
          </label>
          <label className="form-input-radio-label">
            <input
              type="radio"
              name="format"
              value="audiobook"
              checked={format === "audiobook"}
              onChange={(e) => setFormat(e.target.value)}
            />
            audiobook
          </label>
        </div>
      </div>
      <button type="submit">pick</button>
    </form>
  );
}

export default PickBookToRead;

// <div className="pickbook-form-input-container">
//   <label className="form-input-label">genre (only if book has tags)</label>
//   <select value={genre} onChange={(e) => setGenre(e.target.value)}>
//     //TODO: make this display dynamically based on tags (maybe need to add a tags collection)
//     {/* will hardcode for the moment */}
//     <option value="">choose genre</option>
//     <option value="fantasy">fantasy</option>
//     <option value="sci-fi">sci-fi</option>
//     <option value="thriller">thriller</option>
//     <option value="memoir/autobiography/biography">memoir/autobiography/biography</option>
//     <option value="psychology">psychology</option>
//   </select>
// </div>


function pickBooks (books, reRead, format, length, amount, ownedShelfId, readShelfId, getRandomBooks) {
  //first filter based on reread
  const filteredReReadBooks = books.filter(book => {
    if (reRead === 'no') {
      // only from ownedShelfId
      return book.shelfIds.includes(ownedShelfId);
    } else if (reRead === 'yes') {
      // only from readShelfId
      return book.shelfIds.includes(readShelfId);
    } else if (reRead === "don't care") {
      // from either shelf
      return book.shelfIds.includes(ownedShelfId) || book.shelfIds.includes(readShelfId);
    }
  });
  // console.log(filteredReReadBooks);
  //second filter based on format
  const filteredFormatBooks = filteredReReadBooks.filter(book => {
    return book.format.includes(format);
  });
  // console.log(filteredFormatBooks);
  //third filter based on length
  const filteredLengthBooks = filteredFormatBooks.filter(book => {
    if (length === 1) return book.bookId.pages < 250;
    if (length === 2) return book.bookId.pages >= 250 && book.bookId.pages <= 450;
    if (length === 3) return book.bookId.pages > 450;
  });
  // console.log(filteredLengthBooks);
  //return a specific number of books to choose from based on amount
  const pickedBooks = getRandomBooks(filteredLengthBooks, amount);
  return pickedBooks;
}