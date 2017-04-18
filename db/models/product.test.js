'use strict'

const db = require('APP/db')
    , {Product} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('The `Product` model', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  var product;
  beforeEach(function(){
    product = Product.build({
      name: 'Mens Bike',
      category: 'Mountain',
      price: 1000,
      images: [1, 2, 3],
      color: 'Red',
      size: 'Medium',
      availability: true,
      reviewStars: 4.7,
      description: 'this bike rocks'
    });
  });

  describe('Columns exist', () => {
    it('has a name definition', () => {
      expect(product.attributes.name).to.be.an('object');
    });
    it('has a category definition', () => {
      expect(product.attributes.category).to.be.an('object');
    });
    it('has a price definition', () => {
      expect(product.attributes.price).to.be.an('object');
    });
  })

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
        expect(savedProduct.availability).to.equal(true);
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
        expect(result.message).to.contain('Validation error');
      });
    });

     it('requires `name` is not an empty string', function () {

      product.name = '';

      return product.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error');
      });
    });
  })
})
