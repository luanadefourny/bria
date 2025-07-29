import NavBar from './../NavBar/NavBar';
import Dashboard from './../Dashboard/Dashboard';
import Library from '../Library/Library';

import './Home.css';

function Home ({ books, setBooks, nav, setNav }) {
  return (
    <div className="home-containter">
      <NavBar books={ books } setBooks={ setBooks } setNav={ setNav } />
      {nav === 'dashboard' && (
        <Dashboard books={ books } />
      )}
      {nav === 'library' && (
        <Library books={ books } />
      )}
    </div>
  );
};

export default Home;