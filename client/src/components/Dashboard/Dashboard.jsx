import CurrentlyReading from './../CurrentlyReading/CurrentlyReading';
import Shelves from './../Shelves/Shelves';
import { getUserBooks } from '../../services/bookService.js';

import './Dashboard.css';
import { useEffect, useState } from 'react';

function Dashboard ({ books }) {

  // const [books, setBooks] = useState([]); //essentially this needs to be the "All" bookshelf

  // useEffect(() => {
  //   async function fetchUserBooks () {
  //     try {
  //       const userBooks = await getUserBooks(); 
  //       setBooks(userBooks);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchUserBooks();
  // }, [])

  return (
    <div className="dashboard-container">
      <div className="left-container">
        <CurrentlyReading />
      </div>
      <div className="shelves-dashboard-container">
        <Shelves books={ books }/>
      </div>
    </div>
  );
};

export default Dashboard;