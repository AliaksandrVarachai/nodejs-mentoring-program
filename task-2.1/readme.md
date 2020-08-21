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
