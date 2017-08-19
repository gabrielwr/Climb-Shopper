'use strict'

const db = require('APP/db')
const Review = db.model('reviews')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    forbidden('listing reviews is not allowed'),
    (req, res, next) =>
      Review.findAll()
        .then(reviews => res.json(reviews))
        .catch(next))
  .post('/',
       (req, res, next) =>
        Review.create(req.body)
        .then(review => res.status(201).json(review))
        .catch(next))
  .get('/:id',
  // TO DO: make sure that this review belongs to user and review
    (req, res, next) =>
      Review.findById(req.params.id)
      .then(review => { res.json(review) })
      .catch(next))
  .put('/:id',
  // TO DO: make sure that this review belongs to user and review
    // must be logged in to edit?
    mustBeLoggedIn,
    (req, res, next) =>
    Review.findById(req.params.id)
    .then(review => review.update(req.body))
    .then(updatedreview => res.json(updatedreview))
    .catch(next))
  .delete('/:id',
    // TO DO: make sure that this user is Admin
    mustBeLoggedIn,
    (req, res, next) =>
    Review.findById(req.params.id)
    .then(review => review.destroy())
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
