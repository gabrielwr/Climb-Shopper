'use strict'

const db = require('APP/db'),
  { Item } = db,
  { expect } = require('chai'),
  Promise = require('bluebird')

describe('The `Item` model', () => {
  /**
   * First we clear the database and recreate the tables before beginning a run
   */
  before('Await database sync', () => db.didSync)

  /**
   * Next, we create an (un-saved!) item instance before every spec
   */
  let item
  beforeEach(() => {
    item = Item.build({
      price: 100001,
      quantity: 3
    })
  })

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(() => {
    return Promise.all([
      Item.truncate({ cascade: true })
    ])
  })

  describe('attributes definition', function() {

    it('included `price` and `quantity` fields', function() {
      return item.save()
        .then(function(savedItem) {
          expect(savedItem.price).to.equal(100001)
          expect(savedItem.quantity).to.equal(3)
        })
    })
  })

  describe('Validations', () => {

    it('requires `price`', () => {
      item.price = null

      return item.validate()
        .then(function(result) {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('notNull Violation')
        })
    })

    it('errors if `price` is less than zero', () => {
      item.price = -20

      return item.validate()
        .then(function(result) {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('Validation error')
        })
    })

    it('requires `quantity` ', () => {
      item.quantity = null
      return item.validate()
        .then(function(result) {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('notNull Violation')
        })
    })

    it('errors if `quantity` is less than zero', () => {
      item.quantity = -2
      return item.validate()
        .then(function(result) {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('Validation error')
        })
    })

    it('errors if `quantity` is a decimal', () => {
      item.quantity = 2.2
      return item.validate()
        .then(function(result) {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('Validation error')
        })
    })

    it('errors if `quantity` is a string', () => {
      item.quantity = 'test'
      return item.validate()
        .then(function(result) {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('Validation error')
        })
    })
  })
})
