import { Link } from 'react-router';

import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcomePage-containter">
      <h1>Welcome to bria!</h1>
      <h3>Your personal book assistant</h3>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;