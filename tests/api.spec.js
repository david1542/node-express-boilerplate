const request = require('supertest')
const app = require('../app')

describe(`rest api tests`, () => {
  test('should register user correctly', () => {
    const data = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
      password: '123123'
    }

    request(app)
      .post('/api/users/register')
      .send(data)
      .expect(200)
  })
  test('should not register user', () => {
    // Missing password field
    const data = {
      email: 'test@test.com',
      firstName: 'test',
      lastName: 'test',
    }

    request(app)
      .post('/api/users/register')
      .send(data)
      .expect(400)
  })
})