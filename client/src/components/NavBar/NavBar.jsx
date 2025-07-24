import { Link } from 'react-router';

import logo from './../../assets/bria_logo_green.png';

import SearchBar from './../SearchBar/SearchBar';

import './NavBar.css';

function NavBar () {
  return (
    <div className="navBar-container">
      <div className="navbar-logo-container">
        <Link to="/" className="navbar-navigation-link">
          <img className="navbar-logo" src={logo} alt="bria logo" />
        </Link>
      </div>
      <div className="navbar-navigation-container">
        <Link to="/home" className="navbar-navigation-link">
          <div>home</div>
        </Link>
        <Link className="navbar-navigation-link">
          <div>add book</div>
        </Link>
      </div>
      <div className="navbar-search-container">
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;