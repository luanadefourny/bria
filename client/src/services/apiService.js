'use strict';
// apiService service

const searchUrl = 'https://openlibrary.org/search.json';
const worksUrl = 'https://openlibrary.org/works';
const editionUrl = 'https://openlibrary.org/books';

const isbn_ProjectHailMary = '9781529157468';
const isbn_ACourtOfSilverFlames = '9781526635365';


/**
 * Retrieves book data using its ISBN from the OpenLibrary API.
 *
 * @async
 * @function getBookByIsbn
 * @param {string} isbn - The ISBN of the book to look up
 * @returns {Promise<Object>} - The book data from OpenLibrary
 * @throws {Error} If the fetch fails or no data is returned
 */
async function getBookByIsbn (isbn) {
  const res = await fetch(`${searchUrl}?isbn=${isbn}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error('There was an error fetching the data - getBookByIsbn');
  }
}

export { getBookByIsbn };