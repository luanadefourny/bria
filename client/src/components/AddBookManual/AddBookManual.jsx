import './../AddBook/AddBook.css';

function AddBookManual () {
  return (
    <form className="addbook-form-container manual-form">
      <div className="addbook-form-input-container">
        <label className="form-input-label">title</label>
        <input className="form-input-input" type="text" placeholder="book title" required />
      </div>
      <div className="addbook-form-input-container">
        <label className="form-input-label">author</label>
        <input className="form-input-input" type="text" placeholder="author(s)" required />
      </div>
      <div className="addbook-form-input-container">
        <label className="form-input-label">isbn</label>
        <input className="form-input-input" type="text" placeholder="isbn" />
      </div>
      <div className="addbook-form-input-container">
        <label className="form-input-label">published year</label>
        <input className="form-input-input" type="number" placeholder="year" />
      </div>
      <div className="addbook-form-input-container">
        <label className="form-input-label"></label>
        <input className="form-input-input" />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddBookManual;