import { Link } from 'react-router';
import Popup from 'reactjs-popup';

import AddBook from './../AddBook/AddBook';
import PickBook from '../PickBook/PickBook';
import SearchBar from './../SearchBar/SearchBar';

import logo from './../../assets/bria_logo_green.png';
import './NavBar.css';
import 'reactjs-popup/dist/index.css';

function NavBar ({ books, setBooks, setNav }) {
  return (
    <div className="navBar-container">
      <div className="navbar-logo-navigation-container">
        <div className="navbar-logo-container">
          <Link to="/" className="navbar-navigation-link">
            <img className="navbar-logo" src={logo} alt="bria logo" />
          </Link>
        </div>
        <div className="navbar-navigation-container">
          <div className="navbar-navigation-link" onClick={() => setNav('dashboard')}>
            <div>home</div>
          </div>
          <div className="navbar-navigation-link" onClick={() => setNav('library')}>
            <div>library</div>
          </div>
          <Popup 
            trigger={
              <div className="navbar-navigation-link">
                <div>pick next book</div>
              </div>
            }
            modal
          >
            <PickBook books={ books } setBooks={ setBooks } />
          </Popup>
          <Popup 
            trigger={
              <div className="navbar-navigation-link">
                <div>add book</div>
              </div>
            }
            modal
          >
            <AddBook books={ books } setBooks={ setBooks } />
          </Popup>
        </div>
      </div>
      <div className="navbar-search-container">
        <SearchBar books={ books } setBooks={ setBooks  } />
      </div>
    </div>
  );
};

export default NavBar;