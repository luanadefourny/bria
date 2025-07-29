'use strict';

const url = 'http://localhost:3000';


async function updateProgress (bookId, progress) {
  const res = await fetch(`${url}/userbooks/${bookId}/progress`, {
    method: "PUT",
    body: JSON.stringify({ progress }),
    headers: { "Content-Type": "application/json" }
  });
  if (res.ok) {
    const data = await res.json(data);
    return data;
  } else {
    throw new Error('There was an error fetching the data - updateProgress');
  }
}

async function updateStatus (bookId, status) {
  const res = await fetch(`${url}/userbooks/${bookId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
    headers: { "Content-Type": "application/json" }
  });
  if (res.ok) {
    const data = await res.json(data);
    return data;
  } else {
    throw new Error('There was an error fetching the data - updateStatus');
  }
}

async function updateOwned (bookId, owned) {
  const res = await fetch(`${url}/userbooks/${bookId}/owned`, {
    method: "PUT",
    body: JSON.stringify({ owned }),
    headers: { "Content-Type": "application/json" }
  });
  if (res.ok) {
    const data = await res.json(data);
    return data;
  } else {
    throw new Error('There was an error fetching the data - updateOwned');
  }
}

async function updateFavorite (bookId, favorite) {
  const res = await fetch(`${url}/userbooks/${bookId}/favorite`, {
    method: "PUT",
    body: JSON.stringify({ favorite }),
    headers: { "Content-Type": "application/json" }
  });
  if (res.ok) {
    const data = await res.json(data);
    return data;
  } else {
    throw new Error('There was an error fetching the data - updateFavorite');
  }
}

async function updateFormat (bookId, format) {
  const res = await fetch(`${url}/userbooks/${bookId}/format`, {
    method: "PUT",
    body: JSON.stringify({ format }),
    headers: { "Content-Type": "application/json" }
  });
  if (res.ok) {
    const data = await res.json(data);
    return data;
  } else {
    throw new Error('There was an error fetching the data - updateFormat');
  }
}

export { 
  updateProgress, 
  updateStatus, 
  updateOwned, 
  updateFavorite,
  updateFormat,
};