# Task 6

### Task 6.1

Add authorization to the already existing REST service:
- Add `login(username, password)` method which should return `JWTtoken`.
- Add a middleware which will proxy all the requests (except login) and check that HTTP `Authorizationheader` 
  has the correct value of `JWTtoken`.
- In case of the HTTP `Authorizationheader` is absent in the request, the middleware should stop 
  further controller method execution and return HTTP `401` code (`Unauthorized Error`) and standard error message.
- In case of HTTP `Authorization` header has invalid `JWTtoken` in the request, the middleware should return 
  HTTP code `403` (`Forbidden Error` ) and standard error message.

### Task 6.2

Add `CORS middlewareto` access service methods from WEB applications hosted on another domains 
(https://github.com/expressjs/cors).

## Implementation

Tested on `Node v12`.

### Configuration

The project is configured to work with a remote database in ElephantSQL (PostgreSQL as a Service).
For other available options see in the files:
- `server/config/server.js` - for the server part
- `client/src/config.json` - for the client part

### Run the app in dev mode

```
# go to the app repo:
cd <task-6>

# install dependencies:
cd server && npm install && cd ../client && npm install

# run a server part (on 3000 port by default):
cd ../server
npm run dev

# run a client part (on 3001 port by default):
cd ../client
npm run dev
```

### Run the app in prod mode

```
# go to the app repo:
cd <task-6>

# install dependencies:
cd server && npm install && cd ../client && npm install && npm run build

# install a process manager:
npm install -g pm2

# start server and client parts (on ports 3000 and 3001 by default):
pm2 start npm --name server -- start --prefix ./server/ && pm2 serve ./client/dist --name client --port 3001
```

### Instructions for testing

Open http://localhost:3001 and follow the login instructions.
Use credentials:
```
    login: admin-1
    password: admin-1
```
or register your own ones.

**Note:** Client side implements just reading info about users, groups, and permissions. 

All other requests are not available from the client side, but they can be achieved using Postman (see Task 5 for 
the full list of implemented method). In that case JWT tokens must be provided via headers (examples):
```
X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LTIiLCJleHAiOjE2MDYyNTcxNDIyODF9.RznqF9_fKLlS6oQepyyMJm9OFqBGfzom8TL_hnbh42Y
X-Refresh-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LTIiLCJleHAiOjE2MDYyNTk5NDQzMjV9.KGYV_ZZpvUG-Bbe3waKSyj0VVIx4c0vxNGA5ZtDGJEk
```
