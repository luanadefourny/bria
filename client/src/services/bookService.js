'use strict';

import { getBookByEditionKey, getBookByWorksKey, getBookByIsbn } from "./apiService";

const localUrl = 'http://localhost:3000';

async function postBook (bookData) {
  console.log('bookData in postbook in bookservice: ',bookData);
  const book = await buildBookObject(bookData);
  console.log('book: ',book);
  const res = await fetch(`${localUrl}/books`, {
    method: 'POST',
    body: JSON.stringify(book),
    headers: {'Content-Type': 'application/json'}
  });
  console.log('res: ',res);

  if (res.ok) {
    console.log('here');
    const data = await res.json();
    console.log('data: ',data);
    return data;
  } else {
    throw new Error('There was an error fetching the data - PostBook');
  }
}

async function getUserBooks () {
  const res = await fetch(`${localUrl}/books`);
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error('There was an error fetching the data - GetBooks')
  }
}

export { postBook, getUserBooks };

//helper function to get additional book data and rebuild book object
async function buildBookObject (book) {
  console.log('book in build object at beginning: ', book);
  const editionKey = book.cover_edition_key || '';
  console.log('editionkey: ',editionKey);
  const worksKey = book.key?.split('/').pop() || '';
  console.log('workskey: ',worksKey);

  let editionData = {};
  let worksData = {};

  
  if (editionKey) {
    try {
      editionData = await getBookByEditionKey(editionKey);
    } catch (error) {
      console.log(error);
    } 
  }
  if (worksKey) {
    try {
      worksData = await getBookByWorksKey(worksKey);
    } catch (error) {
      console.log(error);
    }
  }
  
  if (book.isbn && !editionKey) {
    try {
      const searchResults = await getBookByIsbn(book.isbn);
      if (searchResults.numFoundExact) {
        const foundBook = searchResults.docs[0];
        book = { ...foundBook, ...book };

        const newEditionKey = foundBook.cover_edition_key;
        const newWorksKey = foundBook.key?.split('/').pop();

        if (newEditionKey) {
          try {
            editionData = await getBookByEditionKey(newEditionKey);
          } catch (error) {
            console.log(error);
          }
        }

        if (newWorksKey) {
          try {
            worksData = await getBookByWorksKey(newWorksKey);
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log('edition book data: ',editionData);
  console.log('works book data: ', worksData);


  console.log('title: ',book.title);
  console.log('author: ',book.author_name || book.authors);
  console.log('isbn: ',editionData.isbn_13?.[0] || editionData.isbn_10?.[0] || '');
  console.log('editionkey: ',editionKey || '');
  console.log('workskey: ',worksKey || '');
  console.log('pages: ',editionData.number_of_pages || null);
  console.log('description: ', worksData?.description?.value || '');
  console.log('published date: ',book.publishedDate || book.first_publish_year
      ? new Date(`${book.first_publish_year}-01-01`)
      : null);
  console.log('cover: ',book.cover_i || null);

  const isbn = editionData.isbn_13?.[0] || editionData.isbn_10?.[0]

  const newBook = {
    title: book.title,
    authors: book.author_name || book.authors,
    // isbn: editionData.isbn_13?.[0] || editionData.isbn_10?.[0] || book.isbn?.trim() || undefined,
    editionKey: editionKey || '',
    worksKey: worksKey || '',
    pages: editionData.number_of_pages || null,
    description: worksData?.description?.value || '',
    publishedDate: book.publishedDate || book.first_publish_year
      ? new Date(`${book.first_publish_year}-01-01`)
      : null,
    cover: book.cover_i || null,
    userData: book.userData,
  }

  if (isbn) {
    newBook.isbn = isbn;
  } else {
    if (book.isbn?.trim()) {
      newBook.isbn = book.isbn.trim();
    } else {
      delete newBook.isbn;
    }
  }

  console.log('newBook: ',newBook);
  return newBook;
}