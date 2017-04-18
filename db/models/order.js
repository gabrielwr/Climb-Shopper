'use strict';
const Sequelize = require('sequelize')
const db = require('./index.js')


module.exports = db => db.define('orders', {
  status: {
    type: Seqelize.ENUM('Pending','Complete'),
    allowNull: false
  }
}



