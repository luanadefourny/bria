# BRIA

<p align="center">
  <img src="images/bria-logo.png" style="border-radius: 0px;" />
</p>

> BRIA is a book tracker with stats and a decision making assistant so you never have to think twice about which books to read or purchase next. It is connected to the OpenLibrary API and therefore you can add books to your hearts content and track your reading progress. Fill your shelves and edit book information and then let the app recommend what to read next based on a few questions.

## Screenshots

<p align="center">
  <img src="images/bria-laptop-2-transparent.png" style="height: 500px" />
</p>



## Getting started
1. Clone the [BRIA](https://github.com/luanadefourny/bria) repository

2. Install dependencies

```
npm install
cd server
npm install
cd ../client
npm install
```

3. Add environment variables

- Create a `.env` file (based on the `.env.example` file)
- Copy the `.env.example` file to `.env` (server)
  ```
  cp .env.example .env
  ```

4. Run the app

```
npm run dev
cd ../server
nodemon index.ts
```

5. Click 'Get Started' and you're all set to use the app!

## Tech Stack

* JavaScript
* React
* Express
* MongoDB (Mongoose)

## Developers

* Luana Defourny - [GitHub](https://github.com/luanadefourny) - [LinkedIn](https://www.linkedin.com/in/luanadefourny/)
