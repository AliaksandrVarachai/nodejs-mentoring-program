# Task 7

## Prerequisites

The task is a continuation of **Homework 6** and should be done in the same repo.

## Task 7.1

Add authorization to the already existing REST service:
- Add unit tests for User entity controller methods using Jest library (https://jestjs.io/).
- Add unit tests for Group entity controller methods using Jest.

## Task 7.2

The information on DB connection (`connection string`) should be stored in `.env` file and should be passed 
to the application using environment variables with the help of `dotenv` package (https://www.npmjs.com/package/dotenv).

As an alternative package you can also use `config` (https://www.npmjs.com/package/config).

## Implementation

Tested on `Node v12`.

### Configuration

The project is configured to work with a remote database in ElephantSQL (PostgreSQL as a Service).
For other available options see in the files:
- `server/config/server.js` - for the server part
- `client/src/config.json` - for the client part

DB config has to be in `.env` file (just **copy it**):
```
API_PORT = 3000
LOG_DIR_NAME = logs

# available options: knex | pg
DATA_SOURCE = knex

# available options: elephantsql | localhost
DB_CONNECTION = elephantsql

# Authurization secret
SECRET = secret

# Time to live for tokens (sec):
ACCESS_TOKEN_TTL = 600
REFRESH_TOKEN_TTL = 6000

# Cloud DB config
DB_HOST = lallah.db.elephantsql.com
DB_PORT = 5432
DB_USER = eyitbcuz
DB_NAME = eyitbcuz
DB_PASSWORD = l0s94pXG_P63mKfrIWwfLMApeSt3eoq8

# Local config example
# DB_HOST = localhost
# DB_PORT = 5432
# DB_USER = task4_user
# DB_NAME = task4_db
# DB_PASSWORD = 111
```

**Note:** If it is necessary to run the app read run instructions for `Task 6` please. 


### Run tests
```
# go to the app server repo:
cd task-7/server
npm install
npm test
```

The generated test coverage will be placed in `test-coverage` folder.
