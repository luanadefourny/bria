import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { getUserBooks } from './services/bookService.js';

import './App.css'
import Home from './components/Home/Home';
import Library from './components/Library/Library';

function App() {
  const [books, setBooks] = useState([]); //essentially this needs to be the "All" bookshelf
  const [nav, setNav] = useState('');

  useEffect(() => {
    async function fetchUserBooks () {
      try {
        const userBooks = await getUserBooks(); 
        setBooks(userBooks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserBooks();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/home" element={<Home 
                                      books={ books } 
                                      setBooks={ setBooks }
                                      nav={ nav }
                                      setNav={ setNav } />}>
      </Route>
      <Route path="/library" element={<Library books={ books } setBooks={ setBooks } />}></Route>
    </Routes>
  );
}

export default App
