# School In The Cloud API

Documentation can be found here https://documenter.getpostman.com/view/11582289/TVCZYqSH
## API URL

https://bwschoolinthecloud.herokuapp.com/


## API Documentation

### General principles

#### Requests
This Web API follows the REST principles:
- resources are accessed using standard HTTPS requests
- HTTP requests are made to distinct API endpoints
- use HTTP verbs (GET, POST, PUT, DELETE, etc) based on the action taken

#### HTTP Methods and their roles
- GET - Retrieves existing resources
- POST - Creates a new resource
- PUT - Updates an existing resource
- DELETE - Deletes resources

## API Endpoints
- All Data is returned in JSON format
- Responses that do not return data, will return a "message" object
- Errors return an "error" object
- Auth requests return a "token" object


### Auth
#### POST /auth/register
Required fields:
```
{ 
  "email": "uniquePassword@email.com",
  "password": "password",
  "username": "uniqueUsername",
  "role": "role"
}
```

#### POST /auth/login
Required fields:
```
{
  "username": "username",
  "password": "password"
}
```

**ALL of the following non-auth requests require an authorization token in the header**
### Users
#### GET /api/users
- Get All Users

#### GET /api/users/:id
- Get User By ID

#### GET /api/users/filter/:query
- Filter Users By Request Query

#### PUT /api/users/:id
- Update User 

#### DELETE /api/users/:id
- Delete User

### Tasks
#### GET /api/tasks
- Get All Tasks

#### GET /api/tasks/:id
- Get Task By ID

#### POST /api/tasks
- Add Task

#### PUT /api/tasks/:id
- Update Task

#### DELETE /api/tasks/:id
- Delete Task

### Sessions
#### GET /api/sessions
- Get All Sessions

#### GET /api/sessions/:id
- Get Session By ID

#### POST /api/sessions
- Add Session

#### PUT /api/sessions/:id
- Update Session

#### DELETE /api/sessions/:id
- Delete Session
