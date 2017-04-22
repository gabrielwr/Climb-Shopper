'use strict'

const db = require('APP/db')
const Order = db.model('orders')

const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list orders.
    // Remove it if you want to allow anyone to list all orders on the site.
    //
    // If you want to only let admins list all the orders, then you'll
    // have to add a role column to the orders table to support
    // the concept of admin orders.
    // forbidden('listing orders is not allowed'),
    (req, res, next) =>
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next))
  .post('/',
    (req, res, next) =>
    Order.create(req.body)
    .then(order => res.status(201).json(order))
    .catch(next))
  .get('/:id',
    // TO DO: make sure that this order belongs to this user or user is Admin
    mustBeLoggedIn,
    (req, res, next) => {
      Order.findOrCreate({ where: { id: req.params.id } })
        .then(order => res.json(order))
        .catch(next)
    })
  .put('/:id',
    // TO DO: make sure that this order belongs to this user or user is Admin
    mustBeLoggedIn,
    (req, res, next) =>
    Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next))
  .delete('/:id',
    // TO DO: make sure that this user is Admin
    mustBeLoggedIn,
    (req, res, next) =>
    Order.findById(req.params.id)
    .then(order => order.destroy())
    .then(wasDestroyedBool => {
      if (wasDestroyedBool) {
        res.sendStatus(204)
      } else {
        const err = Error('order not destroyed')
        err.status = 400
        throw err
      }
    })
    .catch(next))
