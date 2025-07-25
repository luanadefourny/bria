import { useState } from 'react';

import './PickBook.css';
import PickBookToRead from '../PickBookToRead/PickBookToRead';
import PickBookToBuy from '../PickBookToBuy/PickBookToBuy';

function PickBook () {

  const [mode, setMode] = useState(null);
  const [amount, setAmount] = useState(0);
  const [reRead, setReRead] = useState('');
  const [length, setLength] = useState(0);
  const [format, setFormat] = useState('');
  const [genre, setGenre] = useState('');
  
  return (
    <div className="pickBook-container">
      <div className="pickbook-title-mode-button">
        <h1 className="pickbook-title">pick next book</h1>

        <div className="pickbook-mode-button-container">
          <button className="pickbook-mode-button" onClick={() => setMode('read')}>to read</button>
          <button className="pickbook-mode-button" onClick={() => setMode('buy')}>to buy</button>
        </div>
      </div>

      <div className="pickbook-mode-container">  
        {/* picks your next book to read from one you own (maybe also one you've read already) */}
        {mode === 'read' && (
          <PickBookToRead 
            amount={amount}
            setAmount={setAmount}
            reRead={reRead}
            setReRead={setReRead}
            length={length}
            setLength={setLength}
            format={format}
            setFormat={setFormat}
            genre={genre}
            setGenre={setGenre} />
        )}

        {/* picks your next book to buy from the to get to shelf */}
        {mode === 'buy' && (
          <PickBookToBuy 
            amount={amount}
            setAmount={setAmount}
            length={length}
            setLength={setLength}
            genre={genre}
            setGenre={setGenre} />
        )}
      </div>
    </div>
  );
};

export default PickBook;