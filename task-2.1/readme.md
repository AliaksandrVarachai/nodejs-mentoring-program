# Task 2.1

## Requirements

Write a simple REST service with CRUD operations for User entity.

* To create REST service, use `ExpressJS` (https://expressjs.com).
  The User should have the following properties (you can use `UUID` as a user identifier (`id`)):
  ```typescript
  type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
  }  
  ```
 
* Service should have the following CRUD operations for User:
  * get user by `id`;
  * create and update user;
  * get auto-suggest list from `limit` users, sorted by `login` property and filtered by `loginSubstring` 
    in the login property: `getAutoSuggestUsers(loginSubstring, limit)`;
  * remove user (**soft delete** – user gets marked with `isDeleted` flag, but not removed from the collection).
  * Store user’s collection in the service memory (while the service is running).
  
* To test the service CRUD methods, you can use **Postman** (https://www.getpostman.com).


## Implementation

Tested on `Node v12`.

### Run script on prod

`npm run build`

`npm start`

### Run script in dev mode

`npm run dev`

### Server config

Server settings can be found and changed in `config.js` file.

### REST API description 

#### Get all users

**Request example:**
```GET http://localhost:3000/users/all```

**Response example:**
```
Status: 200
Body:
    {
        "data": [
            {
                "id": "4cd8b149-4dc9-4b3a-8af3-e71afd25bed5",
                "login": "admin-1",
                "password": "admin-1",
                "age": 30,
                "isDeleted": false
            },
            {
                "id": "07e8cfba-756d-4574-8d2c-250d2e633251",
                "login": "admin-2",
                "password": "admin-2",
                "age": 35,
                "isDeleted": false
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
                "id": "4cd8b149-4dc9-4b3a-8af3-e71afd25bed5",
                "login": "admin-1",
                "password": "admin-1",
                "age": 30,
                "isDeleted": false
            },
            {
                "id": "07e8cfba-756d-4574-8d2c-250d2e633251",
                "login": "admin-2",
                "password": "admin-2",
                "age": 35,
                "isDeleted": false
            }
        ]
    }
```

#### Get user by ID

**Request example:**
```
GET http://localhost:3000/users/4cd8b149-4dc9-4b3a-8af3-e71afd25bed5
```

**Response example:**
```
Status: 200
Body:
    {
        "data": {
            "id": "4cd8b149-4dc9-4b3a-8af3-e71afd25bed5",
            "login": "admin-1",
            "password": "admin-1",
            "age": 30,
            "isDeleted": false
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
            "id": "4cd8b149-4dc9-4b3a-8af3-e71afd25bed5",
            "login": "admin-1",
            "password": "admin-1",
            "age": 30,
            "isDeleted": false
        }
    }
```

#### Update a user

**Request example:**
```
PATCH http://localhost:3000/users/update
Body:
    {
        "id": "a4d46aa5-6070-4352-919e-34ddaa9f993f",
        "password": "changed-password",
        "age": 99
    }
```

**Response example:**
```
Status: 201
Body:
    {
        "data": {
            "id": "a4d46aa5-6070-4352-919e-34ddaa9f993f",
            "login": "user-1",
            "password": "changed-password",
            "age": 99,
            "isDeleted": false
        }
    }
```

#### Remove a user

**Request example:**
```
DELETE http://localhost:3000/users/remove/a4d46aa5-6070-4352-919e-34ddaa9f993f
```

**Response example:**
```
Status: 204
```


