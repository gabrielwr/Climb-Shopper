const request = require('supertest'),
  { expect } = require('chai'),
  db = require('APP/db'),
  app = require('./start')

/* global describe it before afterEach */

describe.only('/api/orders', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('GET /:id', () => {
    describe('when not logged in', () =>
      it('fails with a 401 (Unauthorized)', () =>
        request(app)
        .get(`/api/orders/1`)
        .expect(401)
      ))

    describe('when logged in', () =>
      it('fails with a 401 (Unauthorized)', () =>
        request(app)
        .get(`/api/orders/1`)
        .expect(401)
      ))
  })

  describe('POST', () =>
    describe('when not logged in', () => {
      it('creates a user', () =>
        request(app)
        .post('/api/orders')
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(201))

      it('redirects to the user it just made', () =>
        request(app)
        .post('/api/orders')
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1)
        .then(res => expect(res.body).to.contain({
          email: 'eve@interloper.com'
        })))
    }))
})
