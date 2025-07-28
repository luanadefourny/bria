import NavBar from './../NavBar/NavBar';
import Dashboard from './../Dashboard/Dashboard';
import { getUserBooks } from '../../services/bookService.js';

import './Home.css';


function Home ({ books, setBooks }) {
  return (
    <div className="home-containter">
      <NavBar books={ books } setBooks={ setBooks } />
      <Dashboard books={ books } />
    </div>
  );
};

export default Home;