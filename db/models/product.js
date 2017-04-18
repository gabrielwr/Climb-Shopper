'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL} = require('sequelize')

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
    type: Sequelize.DECIMAL(7,2),
    allowNull: false,
    validate: {
      is: /^\d{0,5}\.\d{2}$/
    }
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false

  },
  size: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.STRING)
                          )
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    }
  },
  reviewStars: {
    type: Sequelize.DECIMAL(3,2)
  }
})
