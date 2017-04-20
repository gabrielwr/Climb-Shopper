'use strict'

const Sequelize = require('sequelize')

// Including some additional flexibility in case a user logged in with oAuth
module.exports = db => db.define('items', {
  // OB/LP: standard to use integers (measure in cents) to avoid floating point woes
  price: {
    // e.g. 90210.00
    type: Sequelize.DECIMAL(7, 2),
    allowNull: false,
    validate: {
      // Match 0-5 digits a period and then exactly 2 digits
      is: /^\d{0,5}\.\d{2}$/,
      min: 0
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

module.exports.associations = (Item, { Order, Product }) => {
  Item.belongsTo(Order)
  Item.belongsTo(Product)
}
