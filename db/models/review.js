'use strict'
const Sequelize = require('sequelize')
const db = require('./index.js')

module.exports = db => db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  num_stars: {
    type: Sequelize.DECIMAL(1, 2),
    allowNull: false,
    validate: {
      is: /^\d{1}\.\d{0,1}$/,
      min: 0,
      max: 5
    }
  }
})