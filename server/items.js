'use strict'
const db = require('APP/db')
const Item = db.model('items')
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    forbidden('listing Items is not allowed'),
    (req, res, next) =>
      Item.findAll()
        .then(items => res.json(items))
        .catch(next))
  .post('/',
    (req, res, next) =>
      Item.create(req.body)
        .then(item => res.status(201).json(item))
        .catch(next))
  .get('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(next))
  .put('/:id',
    mustBeLoggedIn,
    (req, res, next) =>
      Item.findById(req.params.id)
        .then(item => item.update(req.body))
        .then(updatedItem => res.json(updatedItem))
        .catch(next))
  .delete('/:id',
    // TO DO: make sure that this user is Admin
    mustBeLoggedIn,
    (req, res, next) =>
      Item.findById(req.params.id)
        .then(item => item.destroy())
        .then(wasDestroyedBool => {
          if (wasDestroyedBool) {
            res.sendStatus(204)
          } else {
            const err = Error('Item not destroyed')
            err.status = 400
            throw err
          }
        })
        .catch(next))
