'use strict';
const Sequelize = require('sequelize')
const db = require('./index.js')


module.exports = db => db.define('orders', {
  status: {
    type: Sequelize.ENUM('Pending','Complete'),
    allowNull: false
  }
})

module.exports.associations = (Order, { Item, User }) => {
  Order.hasMany(Item)
  Order.belongsTo(User)
}
