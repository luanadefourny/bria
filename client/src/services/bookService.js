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
  const editionKey = book.cover_edition_key;
  console.log('editionkey: ',editionKey);
  const worksKey = book.key.split('/').pop();
  console.log('workskey: ',worksKey);

  let editionData = {};
  let worksData = {};

  if (editionKey) editionData = await getBookByEditionKey(editionKey);
  if (worksKey) worksData = await getBookByWorksKey(worksKey);

  // console.log(editionData);
  // console.log(worksData);

  const newBook = {
    title: book.title,
    authors: book.author_name,
    isbn: editionData.isbn_13?.[0] || editionData.isbn_10?.[0] || '',
    editionKey: editionKey,
    worksKey: worksKey,
    pages: editionData.number_of_pages || null,
    description: worksData.description.value || '',
    publishedDate: book.first_publish_year
      ? new Date(`${book.first_publish_year}-01-01`)
      : null,
    cover: book.cover_i || null,
  }
  console.log('newBook: ',newBook);
  return newBook;
}