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
  })
})
