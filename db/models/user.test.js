'use strict'

const db = require('APP/db')
    , {User} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('The `User` model', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  let user

  beforeEach(function(){
    user = User.build({
      first_name: 'Simon',
      last_name: 'Cat',
      user_name: 'simoncat',
      email: 'scat@gmail.com',
      password: 'sssccc',
      is_admin: false
    })
  })

  describe('includes all correct attributes,', () => {
    it('has correct values', () => {
      return user.save()
      .then( (savedUser) => {
        expect(savedUser.first_name).to.equal('Simon');
        expect(savedUser.last_name).to.equal('Cat');
        expect(savedUser.user_name).to.equal(simoncat);
        expect(savedUser.email).to.equal('scat@gmail.com');
        expect(savedUser.password).to.equal('sssccc');
        expect(savedUser.is_admin).to.equal(false);
      })
    });
  })

  describe('Validations ', () => {
    it('errors when no first name is entered', function () {
      user.first_name = null

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      })
    })

     it('requires `first name` to not be an empty string', function () {

      user.first_name = '';

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      })
    })

     it('errors when no last name is entered', function () {
      user.last_name = null

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      })
    })

     it('requires `last name` to not be an empty string', function () {

      user.last_name = '';

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      })
    })


    it('errors when no user name is entered', function () {
      user.user_name = null

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when no email is entered', function () {
      user.email = null

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when  email format is invalid', function () {
      user.email = 'clearly_not_an_email'

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });


    it('errors when no password is entered' , function () {
      user.password = null

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

  it('errors when is_admin is not specified' , function () {
      user.is_admin = null

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

  it('errors when is_admin is not a boolean' , function () {
      user.is_admin = 25

      return user.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });


  })
})
