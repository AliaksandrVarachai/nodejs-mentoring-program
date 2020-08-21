# Task 2

## Requirements

### Task 2.1

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

### Task 2.2

Add server-side validation for `create/update` operations of `User` entity:
* all fields are required;
* `login` validation is required;
* `password` must contain letters and numbers;
* user’s `age` must be between 4 and 130.

In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request)
and detailed error message.

For requests validation use special packages like **joi** 
(https://github.com/hapijs/joi,https://www.npmjs.com/package/express-joi-validation).


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
            "id": "a89bbb06-3afd-4ec8-98df-bf0495430c2a",
            "login": "new-user-1",
            "password": "new-user-1",
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
Status: 200
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
        "id": "a4d46aa5-6070-4352-919e-34ddaa9f993f",
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
