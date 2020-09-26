# Task 4

## Requirements

### Task 4.1

Add Groupentity to already existing RESTservice with CRUDoperations.
* TheGroup entity should have the following properties (you can use UUID as Group id):
    ```
    type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';
    type Group = {
        id: string;
        name: string;
        permissions: Array<Permissions>
    }
    ```
* The service should provide the following CRUD operations for Group:
    - get group by id;
    - get all groups;
    − create and update a group;
    − remove group (hard delete–group data is fully removed from the DB).
* Storing of groups data should be done in PostgreSQL in Groups table.
* The service should follow the principles of 3-layer architecture.

### Task 4.2

* Link User records in one table with Group records in another table.
* Add a UserGroup table("many-to-many" relationship) which will store the data describing which users are assigned 
to which group.
* If any record gets removed from the DB, then all linked records should be removed from UserGroup as well.

### Task 4.3

Add `addUsersToGroup(groupId, userIds)` method which will allow adding users to a certain group.
Use *transactions* to save records in DB.

## Implementation

Tested on `Node v12`.

### Configuration

The project is configured to work with a remote database in ElephantSQL (PostgreSQL as a Service).
For other available options see `config.js` file.

### Run script on prod

```
cd task-4
npm install
npm start
```

### Run script in dev mode

#### Remote PostgreSQL on elephantSQL (configured by default)

```
cd task-4
npm install
npm run dev
```
See https://www.elephantsql.com for details 

#### Running PostgreSQL on a local machine

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

This option can be changed in `config.js` to the next ones:

* to use `pg` database driver: 
    ```
    const config = {
        ...
        DATA_SOURCE: AVAILABLE_DATA_SOURCES.PG
        ...
    };
    ```

### REST API description 

| Method  | Path                            | Description      |
| ------- | ------------------------------- | ---------------- |
| GET     | /users/all                      | Provides list of all users |
| GET     | /users/auto-suggest             | Provides list of users by part of their name |
| GET     | /users/:id                      | Provides user object |
| PUT     | /users/create                   | Creates a new user |
| PATCH   | /users/update                   | Updates the user |
| DELETE  | /users/remove/:id               | Removes the user (soft) |
| GET     | /groups/all                     | Provides list of all groups |
| GET     | /groups/:id                     | Provides a group object |
| PUT     | /groups/create                  | Creates a new group |
| DELETE  | /groups/delete/:id              | Deletes the group (hard) |
| GET     | /permissions/all                | Provides list of all permissions |
| GET     | /permissions/:id                | Provides a permission object |
| PUT     | /permissions/create             | Creates a new permission |
| DELETE  | /permissions/delete/:id         | Deletes the permission (hard) |
| POST    | /add-users-to-group             | Adds list of users to the group |
| DELETE  | /delete-users-from-group        | Deletes list of users from the group |
| POST    | /add-permissions-to-group       | Adds list of permissions to the group |
| DELETE  | /delete-permissions-from-group  | Deletes the permission list from the group |
| GET     | /user-permissions/:id           | Provides list of permissions for the user |
| GET     | /user-groups/:id                | Provides list of groups for the user |
| GET     | /group-users/:id                | Provides list of users for the group |

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
                "userId": "00000000-0000-4000-0000-000000000017",
                "isDeleted": false,
                "login": "admin-1",
                "password": "admin-1",
                "age": 30
            },
            {
                "userId": "00000000-0000-4000-0000-000000000018",
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
                "userId": "00000000-0000-4000-0000-000000000017",
                "isDeleted": false,
                "login": "admin-1",
                "password": "admin-1",
                "age": 30
            },
            {
                "userId": "00000000-0000-4000-0000-000000000018",
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
GET http://localhost:3000/users/00000000-0000-4000-0000-000000000017
```

**Response example:**
```
Status: 200
Body:
    {
        "data": {
            "userId": "00000000-0000-4000-0000-000000000017",
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
       "age": 44
    }
```

**Response example:**
```
Status: 201
Body:
    {
        "data": {
            "userId": "ebc02386-35a2-425f-84a2-c8ed70bc0d7d",
            "isDeleted": false,
            "login": "test-user-1",
            "password": "test-user-1",
            "age": 44
        }
    }
```

#### Update a user

**Request example:**
```
PATCH http://localhost:3000/users/update
Body:
    {
        "id": "ebc02386-35a2-425f-84a2-c8ed70bc0d7d",
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
            "userId": "ebc02386-35a2-425f-84a2-c8ed70bc0d7d",
            "isDeleted": false,
            "login": "test-user-1",
            "password": "changed-password-1",
            "age": 99
        }
    }
```

#### Remove a user

**Request example:**
```
DELETE http://localhost:3000/users/remove/ebc02386-35a2-425f-84a2-c8ed70bc0d7d
```

**Response example:**
```
Status: 204
```




