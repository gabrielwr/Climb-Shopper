'use strict'

const db = require('APP/db')
    , {Product} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('The `Product` model', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  let product

  beforeEach(function(){
    product = Product.build({
      name: 'Mens Bike',
      category: 'Mountain',
      price: 1000,
      images: [
                'http://www.placecat.com/2000/2000',
                'http://www.placegoat.com/2000/2000',
                'http://www.placecat.com/400/400'
              ],
      color: 'Red',
      size: 'Medium',
      quantity: 3,
      reviewStars: 4.7,
      description: 'this bike rocks'
    });
  });

  describe('includes all correct attributes,', () => {
    it('has correct values', () => {
      return product.save()
      .then( (savedProduct) => {
        expect(savedProduct.name).to.equal('Mens bike');
        expect(savedProduct.category).to.equal('Mountain');
        expect(savedProduct.price).to.equal(1000);
        expect(savedProduct.images.length).to.equal(3);
        expect(savedProduct.color).to.equal('Red');
        expect(savedProduct.size).to.equal('Medium');
        expect(savedProduct.quantity).to.equal(3);
        expect(savedProduct.reviewStars).to.equal(4.7);
        expect(savedProduct.description).to.equal('this bike rocks');
      })
    });
  })

  describe('Validations ', () => {
    it('errors when no name is entered', function () {
      product.name = null

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      })
    })

     it('requires `name` to not be an empty string', function () {

      product.name = '';

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      })
    })


    it('errors when no category is entered', function () {
      product.category = null

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when no price is entered', function () {
      product.price = null

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when price is equal to 0', function () {
      product.price = 0

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when price is less than 0', function () {
      product.price = -44

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when images do not begin with `http://`' , function () {
      product.images[0] = 'blahblahblah'

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when no color is entered' , function () {
      product.color = null

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when no size is entered' , function () {
      product.size = null

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when availability is not an integer' , function () {
      product.availability = 1.5

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when availability is less than 0' , function () {
      product.availability = -4

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });

    it('errors when there is no description' , function () {
      product.description = null

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error')
      });
    });
  })
})
