import { route } from '@react-router/dev/routes';

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  route('*?', 'catchall.jsx'),
  route('/', './components/WelcomePage/WelcomePage.jsx'),
  route('/home', './components/Home/Home.jsx'),
  route('/library', './components/Library/Library.jsx'),
];