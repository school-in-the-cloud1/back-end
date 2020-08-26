const supertest = require('supertest');
const server = require('../server');
const restricted = require('../../auth/restricted-mw.js');

describe('sessions-router', () => {
  const testDate = '11/15/2020';
  const testTime = '18:30';
  const testDuration = '30';
  const testVolunteerId = '1'
  
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
  
  describe('POST /addSession', () => {
    it('responds with success with all required fields', () => {
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
                .post('/api/sessions')
                .send({ date: testDate, time: testTime, duration: testDuration, volunteer_id: testVolunteerId })
                .set('authorization', credentials.token)
                .then(response => {
                  credentials.id = response.body.data.id
                  expect(response.status).toBe(201)
                })
            })
        })
    })

    it('responds with error if trying to add session with missing data', () => {
      return supertest(server)
        .post('/api/sessions')
        .send({ date: testDate })
        .then(response => {
          expect(response.status).toBe(401);
        })
    })
  })

  describe('Get /getAllSessions', () => {
    it('responds with success if able to get all sessions', () => {
      return supertest(server)
        .get('/api/sessions')
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })

  describe('Get /getSessionById', () => {
    it('responds with success if able to get session by ID', () => {
      return supertest(server)
        .get(`/api/sessions/${credentials.id}`)
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })

  describe('PUT /updateSession', () => {
    it('responds with error if trying to update a session that does not exist', () => {
      return supertest(server)
        .put('/api/sessions/100000')
        .send({ date: '11/16/2020' })
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(404);
        })
    })
    it('responds with success if able to update a session', () => {
      return supertest(server)
        .put(`/api/sessions/${credentials.id}`)
        .send({ date: '11/16/2020' })
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })

  describe('DELETE /deleteSession', () => {
    it('responds with error if trying to delete a session that does not exist', () => {
      return supertest(server)
        .delete('/api/sessions/100000')
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(404);
        })
    })
    it('responds with success if able to delete a session', () => {
      return supertest(server)
        .delete(`/api/sessions/${credentials.id}`)
        .set('authorization', credentials.token)
        .then(response => {
          expect(response.status).toBe(200);
        })
    })
  })  
})