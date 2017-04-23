const request = require('supertest'),
  { expect } = require('chai'),
  db = require('APP/db'),
  app = require('./start')

/* global describe it before afterEach */

describe.only('/api/review', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('GET', () =>
    describe('get the reviews', () => {
      it('fails with a 403 (Forbidden)', () =>
        request(app)
        .get(`/api/reviews/`)
        .expect(403)
      )

      it('get one review using reviewId', () =>
        request(app)
        .get(`/api/reviews/:id`)
      )
    }))

  describe('POST', () =>
    describe('when not logged in', () => {
      it('creates a user', () =>
        request(app)
        .post('/api/reviews')
        .send({
          title: 'Dope Bikez',
          content: 'This bike is so dope, it is a firecracker under my keister (sp?)',
          num_stars: 5
        })
        .expect(201))
    }))
})
