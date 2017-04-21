'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, BOOLEAN} = require('sequelize')

//Including some additional flexibility in case a user logged in with oAuth
module.exports = db => db.define('users', {
  //should we separate first and last name like done in tests or not?
  first_name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  last_name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  user_name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
    unique: true,
  },
  is_admin: {
    type: BOOLEAN,
    defaultValue: false,
    // we could add our own custom validator for boolean:
    // http://stackoverflow.com/questions/36069722/sequelize-datatypes-not-being-validated/36104158
  },

  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  defaultScope: {
    attributes: {exclude: ['password_digest']}
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return bcrypt.compare(plaintext, this.password_digest)
    }
  }
})

module.exports.associations = (User, {OAuth, Review, Order}) => {

  User.hasOne(OAuth)
  //do we need through tables here?
  User.hasMany(Review, {as: 'reviews'}),
  User.hasMany(Order, {as: 'orders'})
}

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
}
