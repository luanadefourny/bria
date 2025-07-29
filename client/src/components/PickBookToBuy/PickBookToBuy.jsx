import './../PickBook/PickBook.css';

function PickBookToBuy ({getRandomBooks, books, setBooks, wantShelfId, amount, setAmount, length, setLength}) {
  
  function handleSubmit (e) {
    e.preventDefault();
    const pickedBooks = pickBooks(books, length, amount, wantShelfId, getRandomBooks);
    console.log(pickedBooks);
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
      <button type="submit">pick</button>
    </form>
  );
}

export default PickBookToBuy;

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

function pickBooks (books, length, amount, wantShelfId, getRandomBooks) {
  console.log('amount: ', amount);
  const filteredWantBooks = books.filter(book => {
    return book.shelfIds.includes(wantShelfId);
  })
  const filteredLengthBooks = filteredWantBooks.filter(book => {
    if (length === 1) return book.bookId.pages < 250;
    if (length === 2) return book.bookId.pages >= 250 && book.bookId.pages <= 450;
    if (length === 3) return book.bookId.pages > 450;
  });
  const pickedBooks = getRandomBooks(filteredLengthBooks, amount);
  return pickedBooks;
}