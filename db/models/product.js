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
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  color: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false

  },
  size: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  reviewStars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports.associations = (Product, { Review }) => {
  Product.hasMany(Review)
}
