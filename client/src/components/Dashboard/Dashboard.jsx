import CurrentlyReading from './../CurrentlyReading/CurrentlyReading';
import Shelves from './../Shelves/Shelves';
import PickBook from './../PickBook/PickBook';

import './Dashboard.css';

function Dashboard () {
  return (
    <div className="dashboard-container">
      <div className="left-container">
        <CurrentlyReading />
        <PickBook />
      </div>
      <div className="shelves-dashboard-container">
        <Shelves />
      </div>
    </div>
  );
};

export default Dashboard;