import './../PickBook/PickBook.css';

function PickBookToRead (amount, setAmount, reRead, setReRead, length, setLength, format, setFormat, genre, setGenre) {
  return (
    <form className="pickbook-form-container">
      <div className="pickbook-form-input-container">
        <label className="form-input-label">how many picks would you like?</label>
        <input 
          className="form-input-input" 
          type="range" 
          min="1"
          max="3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}></input>
      </div>
      <div className="form-input-range">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div className="pickbook-form-input-container">
        <label className="form-input-label">would you like to re-read?</label>
        <div className="form-input-radio">
          <label>
            <input
              type="radio"
              name="reRead"
              value="yes"
              checked={reRead === 'yes'}
              onChange={(e) => setReRead(e.target.value)}
            />
            yes
          </label>
          <label>
            <input
              type="radio"
              name="reRead"
              value="no"
              checked={reRead === 'no'}
              onChange={(e) => setReRead(e.target.value)}
            />
            no
          </label>
          <label>
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
          onChange={(e) => setLength(e.target.value)}></input>
      </div>
      <div className="form-input-range">
        <span>Short</span>
        <span>Medium</span>
        <span>Long</span>
      </div>
      <div className="pickbook-form-input-container">
        <label className="form-input-label">format</label>
        <div className="form-input-radio">
          <label>
            <input
              type="radio"
              name="format"
              value="physical"
              checked={format === 'physical'}
              onChange={(e) => setFormat(e.target.value)}
            />
            physical
          </label>
          <label>
            <input
              type="radio"
              name="format"
              value="kindle"
              checked={format === 'kindle'}
              onChange={(e) => setFormat(e.target.value)}
            />
            kindle
          </label>
          <label>
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
      <div className="pickbook-form-input-container">
        <label className="form-input-label">genre (only if book has tags)</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          //TODO: make this display dynamically based on tags (maybe need to add a tags collection)
          {/* will hardcode for the moment */}
          <option value="">choose genre</option>
          <option value="fantasy">fantasy</option>
          <option value="sci-fi">sci-fi</option>
          <option value="thriller">thriller</option>
          <option value="memoir/autobiography/biography">memoir/autobiography/biography</option>
          <option value="psychology">psychology</option>
        </select>
      </div>
        <button type="submit">pick</button>
    </form>
  );
}

export default PickBookToRead;