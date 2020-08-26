const supertest = require('supertest');
const server = require('../server');
const restricted = require('../../auth/restricted-mw.js');

describe('task-router', () => {
  const testTitle = 'test title';
  const testDescription = 'test description';

  const uniqueUsername = `unique${Math.random()}`;
  const uniqueEmail = `unique${Math.random()}`;
  const credentials = {
    id:'',
    email: uniqueEmail,
    username: uniqueUsername,
    password: 'testpassword',
    role: 'testrole',
    token: ''
  }

  it('is able to run tests', () => {
    expect(true).toBeTruthy();
  })
  
  describe('POST /addTask', () => {
    it('responds with success with title and description', () => {
      return supertest(server)
        .post('/api/auth/register')
        .send({ email: credentials.email, username: credentials.username, password: credentials.password , role: credentials.role})
        .then(response => {
          return supertest(server)
            .post('/api/auth/login')
            .send({ username: credentials.username, password: credentials.password })
            .then(response => {
              credentials.token = response.body.token;
              return supertest(server)
                .post('/api/tasks')
                .send({ title: 'test title', description: 'test description' })
                .set('authorization', credentials.token)
                .then(response => {
                  credentials.id = response.body.data.id
                  expect(response.status).toBe(201)
                })
            })
        })
    })

    it('responds with error if trying to add task without title', () => {
      return supertest(server)
        .post('/api/tasks')
        .send({ description: testDescription })
        .then(response => {
          expect(response.status).toBe(401);
        })
    })

    it('responds with error if trying to add task without description', () => {
      return supertest(server)
        .post('/api/tasks')
        .send({ title: testTitle })
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(500);
        })
    })
  })

  describe('Get /getAllTasks', () => {
    it('responds with success if able to get all tasks', () => {
      return supertest(server)
        .get('/api/tasks')
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })

  describe('Get /getTaskById', () => {
    it('responds with success if able to get task by ID', () => {
      return supertest(server)
        .get(`/api/tasks/${credentials.id}`)
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })

  describe('PUT /updateTask', () => {
    it('responds with error if trying to update a task that does not exist', () => {
      return supertest(server)
        .put('/api/tasks/100000')
        .send({ description: 'updated test description' })
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(404);
        })
    })
    it('responds with success if able to update a task', () => {
      return supertest(server)
        .put(`/api/tasks/${credentials.id}`)
        .send({ description: 'updated test description' })
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })

  describe('DELETE /deleteTask', () => {
    it('responds with error if trying to delete a task that does not exist', () => {
      return supertest(server)
        .delete('/api/tasks/100000')
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(404);
        })
    })
    it('responds with success if able to delete a task', () => {
      return supertest(server)
        .delete(`/api/tasks/${credentials.id}`)
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })  
})