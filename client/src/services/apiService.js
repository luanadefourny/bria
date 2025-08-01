'use strict';

const searchUrl = 'https://openlibrary.org/search.json';
const worksUrl = 'https://openlibrary.org/works';
const editionUrl = 'https://openlibrary.org/books';

const coverUrl = ''

const isbn_ProjectHailMary = '9781529157468';
const isbn_ACourtOfSilverFlames = '9781526635365';
/**
 * Retrieves book data in an array using a general string from the OpenLibrary API.
 * 
 * @async
 * @function getBooksBySearch
 * @param {string} searchString The general search query string to look up
 * @returns The book array from OpenLibrary
 * @throws If the fetch fails or no data is returned
 */
async function getBooksBySearch (searchString) {
  console.log(searchString);
  const urlSearchString = searchString.split(' ').join('+');
  console.log(urlSearchString);
  const res = await fetch(`${searchUrl}?q=${urlSearchString}`);
  if (res.ok) {
    const data = await res.json();
    const filteredData = data.docs.filter(book => book.cover_edition_key && book.key);
    return filteredData;
  } else {
    throw new Error('There was an error fetching the data - getBooksBySearch');
  }
}

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
  console.log('in getbookbyisbn');
  const res = await fetch(`${searchUrl}?isbn=${isbn}`);
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error('There was an error fetching the data - getBookByIsbn');
  }
}

/**
 *
 * 
 * @async
 * @function getBookByEditionKey
 * @param {string} key
 * @return {Promise<Object>} 
 * @throws {Error}
 */
async function getBookByEditionKey (key) {
  const res = await fetch(`${editionUrl}/${key}.json`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error('There was an error fetching the data - getBookByEditionKey');
  }
}

/**
 *
 * 
 * @async
 * @function getBookByWorksKey
 * @param {string} key
 * @return {Promise<Object>}
 * @throws {Error}
 */
async function getBookByWorksKey (key) {
  const res = await fetch(`${worksUrl}/${key}.json`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error('There was an error fetching the data - getBookByWorksKey');
    }

}

function getBookCover (coverId, size) {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export { getBooksBySearch, getBookByIsbn, getBookByEditionKey, getBookByWorksKey, getBookCover };