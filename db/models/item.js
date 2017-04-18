'use strict'

const Sequelize = require('sequelize')

// Including some additional flexibility in case a user logged in with oAuth
module.exports = db => db.define('items', {
  price: {
    // e.g. 90210.00
    type: Sequelize.FLOAT,
    allowNull: false,
    validations: {
      // matches 0-5 digits before the . and exactly 2 digits after
      is: /^\d{0,5}\.\d{2}$/i
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validations: {
      min: 0,
      isInt: true
    }
  }
})
