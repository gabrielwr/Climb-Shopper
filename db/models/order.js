'use strict';
const Sequelize = require('sequelize')
const db = require('./index.js')


module.exports = db => db.define('order', {
  status: {
    type: Seqelize.ENUM('Pending','Complete'),
    allowNull: false
  }
}



