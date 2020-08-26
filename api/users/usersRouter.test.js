const supertest = require('supertest');
const server = require('../server');
const restricted = require('../../auth/restricted-mw.js');

describe('users-router', () => {

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
  
  describe('POST /register', () => {
    it('responds with success if able to register and login', () => {
      return supertest(server)
        .post('/api/auth/register')
        .send({ email: credentials.email, username: credentials.username, password: credentials.password , role: credentials.role})
        .then(response => {
          return supertest(server)
            .post('/api/auth/login')
            .send({ username: credentials.username, password: credentials.password })
            .then(response => {
              credentials.token = response.body.token;
              credentials.id = response.body.id;
            })
        })
    })
  })

  describe('Get /getAllUsers', () => {
    it('responds with success if able to get all users', () => {
      return supertest(server)
        .get('/api/users')
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })

  describe('Get /getUserById', () => {
    it('responds with success if able to get user by ID', () => {
      return supertest(server)
        .get(`/api/users/${credentials.id}`)
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })

  describe('PUT /updateUser', () => {
    it('responds with error if trying to update a user that does not exist', () => {
      return supertest(server)
        .put('/api/users/100000')
        .send({ first_name: 'Maryam' })
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(404);
        })
    })
    it('responds with success if able to update a user', () => {
      return supertest(server)
        .put(`/api/users/${credentials.id}`)
        .send({ first_name: 'Maryam' })
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })

  describe('DELETE /deleteUser', () => {
    it('responds with error if trying to delete a user that does not exist', () => {
      return supertest(server)
        .delete('/api/users/100000')
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(404);
        })
    })
    it('responds with success if able to delete a user', () => {
      return supertest(server)
        .delete(`/api/users/${credentials.id}`)
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })  
})