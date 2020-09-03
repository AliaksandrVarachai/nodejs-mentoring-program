# Task 3

## Requirements

### Task 3.1

* Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL (https://www.heroku.com/postgresor https://www.elephantsql.com/plans.html).

* Write SQL script which will create **Users** table in the DB and fill it in with predefined users’collection.

* Configure your REST service to work with PostgreSQL.
    * Use the **sequelize** package (http://docs.sequelizejs.com/) as ORM to work with PostgreSQL.
    * As an alternative to **sequelize** you can use more low-level **query-builder** library (http://knexjs.org/).

### Task 3.2

The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/ideal-nodejs-project-structure/) 
and contain the following set of directories:
```
|-routers / controllers
|-services
|-data-access
|-models
```


## Implementation

Tested on `Node v12`.

### Configuration

The project is configured to work with a remote database in ElephantSQL (PostgreSQL as a Service).
For other available options see `config.js` file.

### Run script on prod

```
cd task-3
npm install
npm start
```

### Run script in dev mode

#### PostgreSQL DB is remote on elephantSQL (configured by default)

```
cd task-3
npm install
npm run dev
```
See https://www.elephantsql.com for details 

#### PostgreSQL is running on the local machine

To work with local PostgreSQL database it needed to be installed from https://www.postgresql.org/download and run 


Go to `config.js` and change:
```
const config = {
    ...
    DB_CONNECTION: AVAILABLE_DB_CONNECTIONS.LOCALHOST
    ...
};
```

Then run SQL script to initialize the local DB:
```
cd task-3/sql-scripts
psql -U postgres -f init-db.sql -v userName=task3_user -v dbName=task3_db userPassword=\'111\'
```
where `userName`, `dbName`, and `userPassword` could be changed to any string values.

Then run npm the Express server:
```
cd task-3
npm install
npm run dev
```

#### Other options

**By default** the Express.js service is configured for using **Knex.js** query builder.

This option can be changed in `config.js` to the next ones:

* to use `pg` database driver: 
    ```
    const config = {
        ...
        DATA_SOURCE: AVAILABLE_DATA_SOURCES.PG
        ...
    };
    ```
* to use `in memory` data (without the installation PostgreSQL):
    ```
    const config = {
        ...
        DATA_SOURCE: AVAILABLE_DATA_SOURCES.MEMORY
        ...
    };
    ```

### REST API description 

#### Get all users

**Request example:**
```
GET http://localhost:3000/users/all
```

**Response example:**
```
Status: 200
Body:
    {
        "data": [
            {
                "id": "973ef0f5-4c21-4163-bb6c-8582b6cb8027",
                "isDeleted": false,
                "login": "admin-1",
                "password": "admin-1",
                "age": 30
            },
            {
                "id": "a8244e31-14e1-4512-b8d0-4e65ab9d8bd3",
                "isDeleted": false,
                "login": "admin-2",
                "password": "admin-2",
                "age": 35
            },
            ...
        ]
    }
```

#### Get auto-suggested users

**Request example:**
```
GET http://localhost:3000/users/auto-suggest?login-substring=admin&limit=5
```

**Response example:**
```
Status: 200
Body:
    {
        "data": [
            {
                "id": "973ef0f5-4c21-4163-bb6c-8582b6cb8027",
                "isDeleted": false,
                "login": "admin-1",
                "password": "admin-1",
                "age": 30
            },
            {
                "id": "a8244e31-14e1-4512-b8d0-4e65ab9d8bd3",
                "isDeleted": false,
                "login": "admin-2",
                "password": "admin-2",
                "age": 35
            }
        ]
    }
```

#### Get user by ID

**Request example:**
```
GET http://localhost:3000/users/973ef0f5-4c21-4163-bb6c-8582b6cb8027
```

**Response example:**
```
Status: 200
Body:
    {
        "data": {
            "id": "973ef0f5-4c21-4163-bb6c-8582b6cb8027",
            "isDeleted": false,
            "login": "admin-1",
            "password": "admin-1",
            "age": 30
        }
    }
```

#### Create a new user

**Request example:**
```
PUT http://localhost:3000/users/create
Body:
    {
       "login": "new-user-1",
       "password": "new-user-1",
       "age": 30
    }
```

**Response example:**
```
Status: 201
Body:
    {
        "data": {
            "id": "5ad427a3-9273-407d-9295-bc36ae1091a8",
            "isDeleted": false,
            "login": "new-user-1",
            "password": "new-user-1",
            "age": 30
        }
    }
```

#### Update a user

**Request example:**
```
PATCH http://localhost:3000/users/update
Body:
    {
        "id": "5ad427a3-9273-407d-9295-bc36ae1091a8",
        "password": "changed-password-1",
        "age": 99
    }
```

**Response example:**
```
Status: 200
Body:
    {
        "data": {
            "id": "5ad427a3-9273-407d-9295-bc36ae1091a8",
            "isDeleted": false,
            "login": "new-user-1",
            "password": "changed-password-1",
            "age": 99
        }
    }
```

#### Remove a user

**Request example:**
```
DELETE http://localhost:3000/users/remove/5ad427a3-9273-407d-9295-bc36ae1091a8
```

**Response example:**
```
Status: 204
```


#### Create user validation

##### User name validation #1

**Request example:**
```
PUT http://localhost:3000/users/create
Body:
    {
       "login": "$user$",
       "password": "abc123",
       "age": 30
    }
```

**Response example:**
```
Status: 400
Body:
    {
        "error": {
            "message": "data/login must contain 3-20 chars. Allowed chars: a-z, 0-9, -"
        }
    }
```

##### User name validation #2

**Request example:**
```
PUT http://localhost:3000/users/create
Body:
    {
       "login": "user-1",
       "password": "abc123",
       "age": 30
    }
```

**Response example:**
```
Status: 400
Body:
    {
        "error": {
            "message": "User \"user-1\" already exists."
        }
    }
```

##### Password validation

**Request example:**
```
PUT http://localhost:3000/users/create
Body:
    {
       "login": "new-user",
       "password": "abc___123",
       "age": 30
    }
```

**Response example:**
```
Status: 400
Body:
    {
        "error": {
            "message": "data/password must contain 3-20 chars. Allowed chars: a-z, 0-9, -. At least one letter and number must be provided"
        }
    }
```

##### Age validation

**Request example:**
```
PUT http://localhost:3000/users/create
Body:
    {
        "login": "new-user",
        "password": "abc123",
        "age": 999
    }
```

**Response example:**
```
Status: 400
Body:
    {
        "error": {
            "message": "data/age should be <= 130"
        }
    }
```


#### Update user validation

##### ID validation

**Request example:**
```
PUT http://localhost:3000/users/create
Body:
    {
        "id": "___",
        "password": "abc123",
        "age": 30
    }
```

**Response example:**
```
Status: 400
Body:
    {
        "error": {
            "message": "data/id should match format \"uuid\""
        }
    }
```

##### Password validation

**Request example:**
```
PUT http://localhost:3000/users/create
Body:
    {
        "id": "a4d46aa5-6070-4352-919e-34ddaa9f993f",
        "password": "1",
    }
```

**Response example:**
```
Status: 400
Body:
    {
        "error": {
            "message": "data/password must contain 3-20 chars. Allowed chars: a-z, 0-9, -. At least one letter and number must be provided"
        }
    }
```

##### Age validation

**Request example:**
```
PUT http://localhost:3000/users/create
Body:
    {
        "login": "new-user-2",
        "password": "new-user-2",
        "age": -123
    }
```

**Response example:**
```
Status: 400
Body:
    {
        "error": {
            "message": "data/age should be >= 4"
        }
    }
```
