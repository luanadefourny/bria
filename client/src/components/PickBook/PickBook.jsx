import { useState } from 'react';

import './PickBook.css';
import PickBookToRead from '../PickBookToRead/PickBookToRead';
import PickBookToBuy from '../PickBookToBuy/PickBookToBuy';
import Book from '../Book/Book';

// const allShelfId = '64a0c0b0c3f8fa2d1e4c0011';
const readShelfId = '64a0c0b0c3f8fa2d1e4c0001';
const wantShelfId = '64a0c0b0c3f8fa2d1e4c0002';
const ownedShelfId = '64a0c0b0c3f8fa2d1e4c0003';

function PickBook ({ books, setBooks }) {

  const [mode, setMode] = useState(null);
  const [booksPicked, setBooksPicked] = useState([]);
  const [amount, setAmount] = useState(1);
  const [reRead, setReRead] = useState('');
  const [length, setLength] = useState(1);
  const [format, setFormat] = useState('');
  const [genre, setGenre] = useState(''); //TODO: these aren't in the database right now
  
  function resetPickingState () {
    setAmount(1);
    setReRead('');
    setLength(1);
    setFormat('');
  }

  return (
    <div className="pickBook-container">
      <div className="pickbook-title-mode-button">
        <h1 className="pickbook-title">pick next book</h1>

        <div className="pickbook-mode-button-container">
          <button className="pickbook-mode-button" onClick={() => {setMode('read'); setBooksPicked([])}}>to read</button>
          <button className="pickbook-mode-button" onClick={() => {setMode('buy'); setBooksPicked([])}}>to buy</button>
        </div>
      </div>

      <div className="pickbook-mode-container">  
        {/* picks your next book to read from one you own (maybe also one you've read already) */}
        {mode === 'read' && (
          <PickBookToRead 
            books={books}
            setBooks={setBooks}
            setBooksPicked={setBooksPicked}
            setMode={setMode}
            reset={resetPickingState}
            readShelfId={readShelfId}
            ownedShelfId={ownedShelfId}
            amount={amount}
            setAmount={setAmount}
            reRead={reRead}
            setReRead={setReRead}
            length={length}
            setLength={setLength}
            format={format}
            setFormat={setFormat}
            getRandomBooks={getRandomBooks} />
        )}

        {/* picks your next book to buy from the to get to shelf */}
        {mode === 'buy' && (
          <PickBookToBuy 
            books={books}
            setBooks={setBooks}
            setBooksPicked={setBooksPicked}
            setMode={setMode}
            reset={resetPickingState}
            wantShelfId={wantShelfId}
            amount={amount}
            setAmount={setAmount}
            length={length}
            setLength={setLength}
            getRandomBooks={getRandomBooks} />
        )}

        {/* display picks */}
        {mode === 'picked' && (
          <div className="books-picked-container">
            <h2>your pick{booksPicked.length > 1 ? 's' : ''}</h2>
            <div className="books-picked-covers-container">
              {booksPicked.map(book => (
                <Book key={book._id} book={book} type="pick" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickBook;

function getRandomBooks (books, amount) {
  const shuffledBooks = [...books].sort(() => 0.5 - Math.random());
  console.log(shuffledBooks);
  console.log(Number(amount));
  return shuffledBooks.slice(0, Number(amount));
}