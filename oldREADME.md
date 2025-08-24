# bria
### Book Recommendation & Insight Assistant

> Book tracker, with stats and decision making component.

## Project description
The app will be a database for a user's personal library, as well as be able to pick the user's next read or buy. It will be able to store books that have been read, books that are owned but not read yet, and books that aren't owned but plan to be. It will be able to categorize books by format (physical, kindle, audiobook). If a user wants to read or buy something new, it will pick something from the available shelves according to a few filters, simplifying the decision making process. It will also track progress on books being currently read.

## MVP
Being able to choose a book to read next based on selected filters.

## Tech Stach
**Front End:** React & Vite, MUI (components), plop + handlebars (automation)

**Back End:** Express, MongoDB (mongoose), OpenLibrary API


## Installation
- Fork the [bria](https://github.com/luanadefourny/bria) repository

- Run `git clone` from your fork

- Install all the dependencies, seed the database and run the app

**Root directory**

```
npm install
```
**Server side**
```
cd server
npm install
```
**Seed the mock data** (from the server directory)

To populate the database with mock data for development, you will have to create a `.env` file as well as run some JS code before building the app.

1. Create the `.env` file (from the root directory)
```
touch .env
```
2. Add the necessary environment variables
```
# Database
MONGO_URI=mongodb://localhost:27017/mockBria
DB_NAME=mockBria

# User ID
USER_ID=64a0c0b0c3f8fa2d1e4b0001

# Shelf IDs
READ_SHELF_ID=64a0c0b0c3f8fa2d1e4c0001
WANT_SHELF_ID=64a0c0b0c3f8fa2d1e4c0002
OWNED_SHELF_ID=64a0c0b0c3f8fa2d1e4c0003
ALL_SHELF_ID=64a0c0b0c3f8fa2d1e4c0011
```
3. Run the seed file
```
node mocks/seedMockData.js
```
>Please ignore the seed.js file :)

**Run the server**
```
nodemon index.js
```
**Client side**
```
cd ../client
npm install
npm run dev
```

## Add functionality
If you want to refactor some of the component and add new ones, feel free to use the scripts I have created. Running them allows the creation of Component and Service files. They are run straight from the client directory and will create the respective directories, js and css files where needed with a predesign template.
```
npx plop component componentName
```
```
npx plop service serviceName
```

## Documentation
I also have the added functionality of creating JSDocs. This is extremely helpful to know what each part of the code is doing and see all of it in one place. From the root directory, running the following command with go through all the files in both server and client, recursively, and output an index.html file (found in the client side in a docs directory) that you can open in the browser and take a look at each function.

*I unfortunately did not get around to completing these but I did give it a start so you can see how it works. The commenting in the code has to be structured in a specific way.*
```
npm run jsdocs
```