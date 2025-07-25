'use strict';

import { getBookByEditionKey, getBookByWorksKey } from "./apiService";

const localUrl = 'http://localhost:3000';

async function postBook (bookData) {
  console.log(bookData);
  const book = await buildBookObject(bookData);
  console.log('book: ',book);
  const res = await fetch(`${localUrl}/add-book`, {
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

export { postBook };

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


  const newBook = {
    title: book.title,
    authors: book.author_name || book.authors,
    isbn: editionData.isbn_13?.[0] || editionData.isbn_10?.[0] || '',
    editionKey: editionKey || '',
    worksKey: worksKey || '',
    pages: editionData.number_of_pages || null,
    description: worksData?.description?.value || '',
    publishedDate: book.publishedDate || book.first_publish_year
      ? new Date(`${book.first_publish_year}-01-01`)
      : null,
    cover: book.cover_i || null,
  }
  console.log('newBook: ',newBook);
  return newBook;
}