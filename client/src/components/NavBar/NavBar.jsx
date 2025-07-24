import { Link } from 'react-router';

import logo from './../../assets/bria_logo_green.png';

import SearchBar from './../SearchBar/SearchBar';

import './NavBar.css';

function NavBar () {

  function handleAddBookClick () {
    
  }
  return (
    <div className="navBar-container">
      <div className="navbar-logo-navigation-container">
        <div className="navbar-logo-container">
          <Link to="/" className="navbar-navigation-link">
            <img className="navbar-logo" src={logo} alt="bria logo" />
          </Link>
        </div>
        <div className="navbar-navigation-container">
          <Link to="/home" className="navbar-navigation-link">
            <div>home</div>
          </Link>
          <div className="navbar-navigation-link" onClick={handleAddBookClick}>
            <div>add book</div>
          </div>
        </div>
      </div>
      <div className="navbar-search-container">
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;