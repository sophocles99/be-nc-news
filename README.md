# Northcoders News API

Welcome to my version of the Northocoders News API project. You can find a hosted version of this project here:  
https://nc-news-4ivt.onrender.com

This project simulates a news service to demonstrate creation of a RESTful API server. A list of the available endpoints can be found here:  
https://nc-news-4ivt.onrender.com/api  
<br>

## Installing a local version
If you would like to use a local version of this project, follow the steps below:  
<br>
### Clone the repository
The repository is at https://github.com/sophocles99/nc-news  
Enter `git clone https://github.com/sophocles99/nc-news`  
<br>

### Install packages
`npm install`  
<br>

### Create .env files
Create two `.env` files in the main project folder, as follows:  
**`.env.development`**  
Should contain: `PGDATABASE=nc_news`  
**`.env.test`**  
Should contain: `PGDATABASE=nc_news_test`  
<br>

### Create and seed databases
First create the databases locally, using:
`npm run setup-dbs`  
This will create two databases, `nc_news` for development and `nc_news_test` for testing.  
To seed the development database, use:  `npm run seed`  
<br>

### Hosting the Server Locally
Enter `node listen.js` The server should now be running locally and can be accessed at `localhost:9090/`  
A list of the available endpoints can be found at `localhost:9090/api`  
<br>

### Testing
To run tests, use `npm test`. This will run all current tests, which automatically reseed the test database before each test.