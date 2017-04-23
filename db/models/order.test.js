'use strict'

const db = require('APP/db'),
  { Order } = db,
  { expect } = require('chai'),
  Promise = require('bluebird')

describe.only('The `Order` model', () => {
  /**
   * First we clear the database and recreate the tables before beginning a run
   */
  before('Await database sync', () => db.didSync)

  /**
   * Next, we create an (un-saved!) order instance before every spec
   */
  let order
  beforeEach(() => {
    order = Order.build({
      status: 'Pending',
    })
  })

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(() => {
    return Promise.all([
      Order.truncate({ cascade: true })
    ])
  })

  describe('attributes definition', function() {

    it('included `status` fields', function() {
      return order.save()
        .then(function(savedOrder) {
          expect(savedOrder.status).to.equal('Pending')
        })
    })
  })
})
