import NavBar from './../NavBar/NavBar';
import Dashboard from './../Dashboard/Dashboard';
import Library from '../Library/Library';

import './Home.css';

function Home ({ books, setBooks}) {
  return (
    <div className="home-containter">
      <Dashboard books={ books } />
    </div>
  );
};

export default Home;