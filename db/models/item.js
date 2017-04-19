'use strict'

const Sequelize = require('sequelize')

// Including some additional flexibility in case a user logged in with oAuth
module.exports = db => db.define('items', {
  price: {
    // e.g. 90210.00
    type: Sequelize.DECIMAL(7, 2),
    allowNull: false,
    validate: {
      // Match 0-5 digits a period and then exactly 2 digits
      // May cause grief down the line
      is: /^\d{0,5}\.\d{2}$/
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isInt: true
    }
  }
})
