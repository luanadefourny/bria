import './../AddBook/AddBook.css';

function AddBookIsbn () {
  return (
    <form className="addbook-form-container isbn-form">
      <div className="addbook-form-input-container">
        <label className="form-input-label">isbn</label>
        <input className="form-input-input" type="text" placeholder="enter ISBN"></input>
      </div>
        <button type="submit">Add</button>
    </form>
  );
}

export default AddBookIsbn;