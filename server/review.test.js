const request = require('supertest')
  , {expect} = require('chai')
  , db = require('APP/db')
  , app = require('./start')

/* global describe it before afterEach */

describe('/api/review', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('GET', () =>
    describe('get the reviews', () =>
      it('get all reviews on request to GET', () =>
        request(app)
          .get(`/api/review/`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
          })
      )
      it('get one review using reviewId', () =>
        request(app)
          .get(`/api/review/:id`)
      )
    ))

  describe('POST', () =>
    describe('when not logged in', () => {
      it('creates a user', () =>
        request(app)
          .post('/api/review')
          .send({
            email: 'beth@secrets.org',
            password: '12345'
          })
          .expect(201))

      it('redirects to the user it just made', () =>
        request(app)
          .post('/api/review')
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
