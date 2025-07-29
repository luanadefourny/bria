import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { getUserBooks } from './services/bookService.js';

import './App.css'
import Home from './components/Home/Home';
import Library from './components/Library/Library';
import Layout from './components/Layout/Layout.jsx';

function App() {
  const [books, setBooks] = useState([]); //essentially this needs to be the "All" bookshelf

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
      <Route path="/home" element={
                            <Layout books={books} setBooks={setBooks}>
                              <Home 
                                books={ books } 
                                setBooks={ setBooks }
                              />
                            </Layout>
      }>
      </Route>
      <Route path="/library" element={
                                <Layout books={books} setBooks={setBooks}>
                                  <Library books={ books } setBooks={ setBooks } />
                                </Layout>}>
      </Route>
    </Routes>
  );
}

export default App
