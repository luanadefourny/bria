import { Link } from 'react-router';

import logo from './../../assets/bria_logo_grey.png'

import './WelcomePage.css';

function WelcomePage () {
  return (
    <div className="welcomePage-container">
      <img className="welcome-logo" src={logo} alt="bria logo" />
      <h1>Your personal book assistant</h1>
      <h3>Keep track of your library and let us help you decide what to read next.</h3>
      <div>
        <Link to="/home">
          <button className="welcome2home-button">get started</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;