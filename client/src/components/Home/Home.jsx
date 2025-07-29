import NavBar from './../NavBar/NavBar';
// import Dashboard from '../../../Dashboard/Dashboard';
import Library from '../Library/Library';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading';
import Shelves from '../Shelves/Shelves';

import './Home.css';

function Home ({ books, setBooks }) {
  return (
    <div className="home-container">
      <div className="home-inner-container">
        <div className="left-container">
          <CurrentlyReading />
        </div>
        <div className="shelves-home-container">
          <Shelves books={ books }/>
        </div>
      </div>
    </div>
  );
};

export default Home;