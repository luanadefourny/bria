import './Layout.css';
import NavBar from '../NavBar/NavBar';

function Layout ({children, books, setBooks}) {
  return (
    <div className="layout-container">
      <NavBar books={ books } setBooks={ setBooks } />
      {children}
    </div>
  );
}

export default Layout;