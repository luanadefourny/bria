import NavBar from './../NavBar/NavBar';
import Dashboard from './../Dashboard/Dashboard';

import './Home.css';

function Home () {
  return (
    <div className="home-containter">
      <NavBar />
      <Dashboard/>
    </div>
  );
};

export default Home;