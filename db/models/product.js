'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL} = require('sequelize')

module.exports = db => db.define('products', {
  model: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  }
})
