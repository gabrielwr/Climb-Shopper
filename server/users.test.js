const request = require('supertest')
    , { expect } = require('chai')
    , db = require('APP/db')
    , app = require('./start')
    , User = db.model('users')

/* global describe it before afterEach */

describe('/api/users', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('GET /users', function() {
    // should  test if it's allowed only for admins somehow
    it('responds with an array via JSON', function() {
      request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      // .expect(function(res){
      //   console.log('test');
      //   // res.body is the JSON return object
      //   expect(res.body).to.be.an.instanceOf(Array)
      //   expect(res.body).to.have.length(0)
      // })
    })
    describe('GET /:id', () => {
      var theUser
      beforeEach(function() {
        var creatingSomeUsers = [{
          first_name: 'Chloe',
          last_name: 'One',
          user_name: 'chloe',
          email: 'chloe@gmail.com',
          password: 'ccc',
          is_admin: false
        }, {
          first_name: 'Jeff',
          last_name: 'Two',
          user_name: 'jeff',
          email: 'jeff@gmail.com',
          password: 'jjj',
          is_admin: false
        }, {
          first_name: 'Gabe',
          last_name: 'Three',
          user_name: 'gabe',
          email: 'gabe@gmail.com',
          password: 'ggg',
          is_admin: true
        }]
        .map(data => User.create(data))

        return Promise.all(creatingSomeUsers)
          .then(createdUsers => {
            theUser = createdUsers[1]
          })
      })
      // here we would want to make this fancy check
      it('fails with a 401 (Unauthorized)', () => {
        request(app)
          .get('/api/users/0')
          .expect(401)
      })
    })

    describe('POST', () =>
      describe('when not logged in', () => {
        it('creates a user', () =>
          request(app)
          .post('/api/users')
          .send({
            first_name: 'beth',
            last_name: 'secret',
            user_name: 'bethsecret',
            email: 'beth@secrets.org',
            password: '12345',
            is_admin: false
          })
          .expect(201))

      // Check if the new user was saved to the database
        it('saves the user to the DB', function() {
          request(app)
            .post('/api/users')
            .send({
              first_name: 'Simon',
              last_name: 'Cat',
              user_name: 'simoncat',
              email: 'scat@gmail.com',
              password: 'sssccc',
              is_admin: false
            })
            .expect(201)
            .then(function() {
              return User.findOne({
                where: { email: 'scat@gmail.com' }
              })
            })
            .then(function(foundUser) {
              expect(foundUser).to.exist
              expect(foundUser.email).to.equal('scat@gmail.com')
            })
        })

        it('redirects to the user it just made', () =>
          request(app)
          .post('/api/users')
          .send({
            first_name: 'Simon',
            last_name: 'Cat',
            user_name: 'simoncat',
            email: 'scat@gmail.com',
            password: 'sssccc',
            is_admin: false
          })
          .redirects(1)
          .then(res => expect(res.body).to.contain({
            email: 'scat@gmail.com'
          })))
      }))

    describe('PUT /users/:id', function() {
      let user
      beforeEach(function() {
        return User.create({
          first_name: 'Simon',
          last_name: 'Cat',
          user_name: 'simoncat',
          email: 'scat@gmail.com',
          password: 'sssccc',
          is_admin: false
        })
        .then(function(createdUser) {
          user = createdUser
        })
      })

      it('updates a user', function() {
        request(app)
          .put('/users/' + user.id)
          .send({
            first_name: 'Simon Simon'
          })
          .expect(200)
          .expect(function(res) {
            expect(res.body.user.id).to.not.be.an('undefined')
            expect(res.body.user.first_name).to.equal('Simon Simon')
          })
      })
    })
  })
})
