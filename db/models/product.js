'use strict'

const Sequelize = require('sequelize')

module.exports = db => db.define('products', {
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
  },
  price: {
    type: Sequelize.DECIMAL(7, 2),
    allowNull: false,
    validate: {
      is: /^\d{0,5}\.\d{2}$/,
      min: 0
    }
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
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
      isInt: true,
      min: 0
    }
  },
  reviewStars: {
    type: Sequelize.DECIMAL(2, 1)
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports.associations = (Product, {Review}) => {
  Product.hasMany(Review)
}
