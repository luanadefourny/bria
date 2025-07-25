import { useState } from 'react';

import './PickBook.css';

function PickBook () {

  const [mode, setMode] = useState(null);
  
  return (
    <div className="pickBook-container">
      <h1 className="pickbook-title">pick next book</h1>

      <div className="pickbook-mode-button-container">
        <button className="pickbook-mode-button" onClick={() => setMode('read')}>to read</button>
        <button className="pickbook-mode-button" onClick={() => setMode('buy')}>to buy</button>
      </div>
    </div>
  );
};

export default PickBook;