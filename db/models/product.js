'use strict'

const Sequelize = require('sequelize')

module.exports = db => db.define('products', {
  // OB/LP: might want this to be unique
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
    // OB/LP: watch out for empty strings, consider ENUMs
  },
  price: {
    // OB/LP: standard to use integers (measure in cents) to avoid floating point woes
    type: Sequelize.DECIMAL(7, 2),
    allowNull: false,
    validate: {
      // Match 0-5 digits a period and then exactly 2 digits
      is: /^\d{0,5}\.\d{2}$/,
      min: 0
    }
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    // OB/LP: maybe custom validator for isUrl
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false

  },
  size: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true, // OB/LP: probably redundant
      min: 0
    }
  },
  reviewStars: { // OB/LP: recommend making this into an instance method
    type: Sequelize.DECIMAL(2, 1)
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports.associations = (Product, { Review }) => {
  Product.hasMany(Review)
}
