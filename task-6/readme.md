# Task 5

## Requirements

The task is a continuation of Homework 4 and should be done in the same repo.

### Task 5.1

Add express middleware which will log which service method has been invoked and which arguments have been passed to it.

### Task 5.2

* Add express middleware which will log all unhandled errors and return a standard message with HTTP code `500` 
  (Internal Server Error). 
  
  **Remark:** Do not modify the status code and the message for other errors like validation errors 
  from the previous task.
* Add error handling to `process.on(‘uncaughtException’,...)`.
* Add Unhandled promise rejection listener to log errors.

* Link User records in one table with Group records in another table.
* Add a UserGroup table("many-to-many" relationship) which will store the data describing which users are assigned 
  to which group.
* If any record gets removed from the DB, then all linked records should be removed from UserGroup as well.

### Task 5.3

* Every method in the controllers should log the errors which should include the following information:
  + method name;
  + arguments which have been passed to the method;
  + error message.

## Implementation

Tested on `Node v12`.

### Configuration

The project is configured to work with a remote database in ElephantSQL (PostgreSQL as a Service).
For other available options see `config/server.js` file.

Winston logger is configured in `config/logger.js` and `config/logger-fields.js` files. 

### Run script on prod

```
cd task-5
npm install
npm start
```

### Run script in dev mode

#### Remote PostgreSQL on elephantSQL (configured by default)

```
cd task-5
npm install
npm run dev
```
See https://www.elephantsql.com for details 





#### Running PostgreSQL on a local machine

To work with local PostgreSQL database it needed to be installed from https://www.postgresql.org/download and run 


Go to `config/server.js` and change:
```
const server = {
    ...
    DB_CONNECTION: AVAILABLE_DB_CONNECTIONS.LOCALHOST
    ...
};
```

Then run SQL script to initialize the local DB:
```
cd task-4/sql-scripts
psql -U postgres -f init-db.sql -v userName=task4_user -v dbName=task4_db -v userPassword=\'111\'
```
where `userName`, `dbName`, and `userPassword` could be changed to any string values.

Then fill the database with initial test data:
```
psql -d task4_db -U task4_user -f seeds.sql
```

Then run npm the Express server:
```
cd task-4
npm install
npm run dev
```

To revert the database changes you can run proper scripts:
```
psql -U postgres -f init-db-revert.sql -v userName=task4_user -v dbName=task4_db
psql -d task4_db -U task4_user -f seeds-revert.sql
```

#### Other options

**By default** the Express.js service is configured for using **Knex.js** query builder.

This option can be changed in `server.js` to the next ones:

* to use `pg` database driver: 
    ```
    const server = {
        ...
        DATA_SOURCE: AVAILABLE_DATA_SOURCES.PG
        ...
    };
    ```

### REST API description 

| Method  | Path                                | Description*     |
| ------- | ----------------------------------- | ---------------- |
| GET     | **/api/handled-error**              | Generates an error which is processed by the express app |
| GET     | **/api/unhandled-error**            | Generate an error unhandled by the app (just logging is provided |
| GET     | /api/users/all                      | Provides list of all users |
| GET     | /api/users/auto-suggest             | Provides list of users by part of their name |
| GET     | /api/users/:id                      | Provides user object |
| PUT     | /api/users/create                   | Creates a new user |
| PATCH   | /api/users/update                   | Updates the user |
| DELETE  | /api/users/remove/:id               | Removes the user (soft) |
| GET     | /api/groups/all                     | Provides list of all groups |
| GET     | /api/groups/:id                     | Provides a group object |
| PUT     | /api/groups/create                  | Creates a new group |
| DELETE  | /api/groups/delete/:id              | Deletes the group (hard) |
| GET     | /api/permissions/all                | Provides list of all permissions |
| GET     | /api/permissions/:id                | Provides a permission object |
| PUT     | /api/permissions/create             | Creates a new permission |
| DELETE  | /api/permissions/delete/:id         | Deletes the permission (hard) |
| POST    | /api/add-users-to-group             | Adds list of users to the group |
| DELETE  | /api/delete-users-from-group        | Deletes list of users from the group |
| POST    | /api/add-permissions-to-group       | Adds list of permissions to the group |
| DELETE  | /api/delete-permissions-from-group  | Deletes the permission list from the group |
| GET     | /api/user-permissions/:id           | Provides list of permissions for the user |
| GET     | /api/user-groups/:id                | Provides list of groups for the user |
| GET     | /api/group-users/:id                | Provides list of users for the group |

\*See the detailed description in the **task #4**.

#### Handled error

**Request example:**
```
GET http://localhost:3000/api/handled-error
```

**Response example:**
```
Status: 500
Body:
    {
        "error": {
            "message": "Error handled by Express.js error handler."
        }
    }
```
Generated logs: 
1) `logs/combined.log`:
```
{"dateTime":"2020-10-12T19:42:16.945Z","message":"Error handled by Express.js error handler.","stack":"Error: Error handled by Express.js error handler........","level":"error","service":"expressjs-service"}
{"message":{"startDateTime":"2020-10-12T19:42:16.944Z","request":{"method":"GET","url":"/api/handled-error"},"response":{"statusCode":500,"statusMessage":"Internal Server Error"},"responseTime":21,"trackingInfo":{}},"level":"info","service":"expressjs-service"}
```
2) `log/errors.log`:
```
{"dateTime":"2020-10-12T19:42:16.945Z","message":"Error handled by Express.js error handler.","stack":"Error: Error handled by Express.js error handler........","level":"error","service":"expressjs-service"}
```
3) `console output` (only in development mode):
```
{
  dateTime: '2020-10-12T19:42:16.945Z',
  message: 'Error handled by Express.js error handler.',
  code: undefined,
  stack: 'Error: Error handled by Express.js error handler.......',
  level: 'error',
  service: 'expressjs-service'
}
{
  message: {
    startDateTime: '2020-10-12T19:42:16.944Z',
    request: { method: 'GET', url: '/api/handled-error' },
    response: { statusCode: 500, statusMessage: 'Internal Server Error' },
    responseTime: 21,
    trackingInfo: {}
  },
  level: 'info',
  service: 'expressjs-service'
}
```


#### Unhandled error

**Request example:**
```
GET http://localhost:3000/api/unhandled-error
```

**Response example:**
```
No response
```
Generated logs: 
1) `logs/combined.log`:
```
{"origin":"unhandledRejection","dateTime":"2020-10-12T19:49:28.822Z","message":"Error handled by Node.js environment.","stack":"Error: Error handled by Node.js environment.......","level":"error","service":"expressjs-service"}
```
2) `log/errors.log`:
```
{"origin":"unhandledRejection","dateTime":"2020-10-12T19:49:28.822Z","message":"Error handled by Node.js environment.","stack":"Error: Error handled by Node.js environment.......","level":"error","service":"expressjs-service"}
```


#### Info message

**Request example:**
```
GET http://localhost:3000/api/users/all
```

**Response example:**
```
Status: 200
Body:
    {
        "data": { ... }
    }
```
Generated logs: 
1) `logs/combined.log`:
```
{"message":{"startDateTime":"2020-10-12T20:03:37.854Z","request":{"method":"GET","url":"/api/users/all"},"response":{"statusCode":200,"statusMessage":"OK"},"responseTime":766,"trackingInfo":{"method":"getAllUsers"}},"level":"info","service":"expressjs-service"}
```

2) `console output` (only in development mode):
```
{
  message: {
    startDateTime: '2020-10-12T20:03:37.854Z',
    request: { method: 'GET', url: '/api/users/all' },
    response: { statusCode: 200, statusMessage: 'OK' },
    responseTime: 766,
    trackingInfo: { method: 'getAllUsers', args: undefined }
  },
  level: 'info',
  service: 'expressjs-service'
}
```
