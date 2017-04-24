'use strict'

const db = require('APP/db')
const Review = db.model('reviews')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .param('id', (req, res, next, id) => {
    Review.findById(id)
      .then(review => {
        if (!review) {
          let err = new Error('No review here.. :,( ')
          err.status = 404
          return next(err)
        }
        else {
          req.review = review
          next()
        }
      })
      .catch(next)
  })
  .get('/',
    (req, res, next) =>
      Review.findAll()
        .then(reviews => res.json(reviews))
        .catch(next))
  .post('/',
    mustBeLoggedIn,
    (req, res, next) =>
      Review.create(req.body)
        .then(review => res.status(201).json(review))
        .catch(next))
  .get('/:id',
    // TO DO: make sure that this review belongs to user and review
    (req, res, next) =>
      res.json(req.review))
  .put('/:id',
    // TO DO: make sure that this review belongs to user and review

    mustBeLoggedIn,
    (req, res, next) =>
      req.review.update(req.body)
        .then(updatedreview => res.json(updatedreview))
        .catch(next))
  .delete('/:id',
    // TO DO: make sure that this user is Admin
    mustBeLoggedIn,
    (req, res, next) =>
      req.reviewdestroy()
        .then(wasDestroyedBool => {
          if (wasDestroyedBool) {
            res.sendStatus(204)
          } else {
            const err = Error('review not destroyed')
            err.status = 400
            throw err
          }
        })
        .catch(next))
