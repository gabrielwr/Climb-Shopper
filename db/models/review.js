'use strict'
const Sequelize = require('sequelize')

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
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports.associations = (Review, { Product, User }) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
}