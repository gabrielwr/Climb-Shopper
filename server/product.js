'use strict'
const db = require('APP/db')
const Product = db.model('product')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Product.findAll()
      .then(products => res.json(products))
      .catch(next))
  .post('/', (req, res, next) =>
    Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next))
  .get('/:id', (req, res, next) =>
    Product.findById(req.params.id)
      .then(product => res.json(product))
      .catch(next))
  .put('/:id', (req, res, next) =>
    Product.findById(req.params.id)
    .then(product => product.update(req.body.title))
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next))
  .delete('/:id', (req, res, next) =>
    Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.status(204).end())
    .catch(next))