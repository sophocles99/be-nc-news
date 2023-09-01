# Backend - NC News API

This project is a RESTful API server which provides the backend for a simulated news service similar to Reddit, where users can read, vote and comment on news articles. It provides endpoints for various CRUD operations on a PostgreSQL database containing articles, comments, topics and users. The endpoint for articles allows for fitlering by topic and sorting by criteria such as author, date and title, as well as limits and pagination.

The server was built following Test Driven Development principles using the Jest testing suite. A public version, including a list of the available endpoints, can be found here:  
https://nc-news-dvu9.onrender.com/api  
(NB The server is hosted on a free service so it may take a minute or two to spin up due to inactivity.)

## Installing a local version
If you would like to use a local version of this project, follow the steps below. You will also need to have PostgreSQL installed locally.
### Clone the repository
The repository is at https://github.com/sophocles99/be-nc-news  
Enter `git clone https://github.com/sophocles99/be-nc-news.git`  

### Install packages
`npm install`  

### Create .env files
Create two `.env` files in the root of the project folder, as follows:  
**`.env.development`**  
Should contain: `PGDATABASE=nc_news`  
**`.env.test`**  
Should contain: `PGDATABASE=nc_news_test`  

### Create and seed databases
First create the databases locally, using:
`npm run setup-dbs`  
This will create two databases, `nc_news` for development and `nc_news_test` for testing.  
To seed the development database, use:  `npm run seed`  

### Hosting the Server Locally
Enter `npm run start` The server should now be running locally and can be accessed at `localhost:9090/`  
A list of the available endpoints can then be found at `localhost:9090/api`  

### Testing
To run tests, use `npm test`. This will run all current tests (using Jest and SuperTest), which automatically reseed the test database before each test.

## Dependencies
The project uses the following dependencies:  
cors: ^2.8.5  
dotenv: ^16.0.0  
express: ^4.18.2  
pg: ^8.7.3  
pg-format: ^1.0.4  

And the following dev-dependencies:  
husky: ^8.0.2  
jest: ^27.5.1  
jest-extended: ^2.0.0  
jest-sorted: 1.0.14  
supertest: 6.3.3
