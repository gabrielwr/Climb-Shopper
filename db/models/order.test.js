'use strict'

const db = require('APP/db')
  , {Order, User} = db
  , {expect} = require('chai')
  , Promise = require('bluebird')

/* global describe it before afterEach */



/**
 *
 * Start here!
 *
 * These tests describe the model that you'll be writing in models/order.js
 *
 */

describe('The `Order` model', () => {

  /**
   * First we clear the database and recreate the tables before beginning a run
   */
  before(function () {
    return db.sync({force: true});
  });

  /**
   * Next, we create an (un-saved!) order instance before every spec
   */
  var fullText = 'The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family.';

  var order;
  beforeEach(function(){
    order = Order.build({
      status: 'pending',
    })
  });

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      Order.truncate({ cascade: true }),
      User.truncate({ cascade: true })
    ]);
  });

  describe('attributes definition', function(){

    /**
     * Your model should have two fields (both required): `title` and `content`.
     *
     * http://docs.sequelizejs.com/en/v3/docs/models-definition/#validations
     */
    it('includes `title` and `content` fields', function () {

      return order.save()
        .then(function (savedOrder) {
          expect(savedOrder.title).to.equal('Migratory Birds');
          expect(savedOrder.content).to.equal(fullText);
        });

    });

    it('requires `content`', function () {

      order.content = null;

      return order.validate()
        .then(function(result) {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('content cannot be null');
        });

    });

    it('requires `title` (in a more strict way than for `content`)', function () {

      order.title = '';

      return order.validate()
        .then(function (result) {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('Validation error');
        });

    });

    it('can handle long `content`', function() {

      var orderContent = 'WALL-E (stylized with an interpunct as WALL·E) is a 2008 American computer-animated science-fiction comedy film produced by Pixar Animation Studios and released by Walt Disney Pictures. Directed by Andrew Stanton, the story follows a robot named WALL-E, who is designed to clean up an abandoned, waste-covered Earth far in the future. He falls in love with another robot named EVE, who also has a programmed task, and follows her into outer space on an adventure that changes the destiny of both his kind and humanity. Both robots exhibit an appearance of free will and emotions similar to humans, which develop further as the film progresses.';

      return Order.create({
        title: 'WALL-E',
        content: orderContent
      })
        .then(function(result) {
          expect(result).to.be.an('object');
          expect(result.title).to.equal('WALL-E');
          expect(result.content).to.equal(orderContent);
        });

    });

  });

  /**
   * SPECIAL NOTE: at this point, you have defined enough of the Order model to
   * move on to the Routes tests. The rest of these specs, while necessary to
   * fully pass the Model suite, are not necessary for the Routes suite. Bear in
   * mind that the Routes suite depends on a WORKING model, so if you break the
   * Order model in your code below, the Routes will also fail. Make commits!
   */

  describe('options definition', function(){

    describe('`snippet` virtual field', function(){

      /**
       * Set up a virtual field (check out sequelize getter methods) called `snippet`
       * that returns the first 23 characters of the content followed by "...".
       *
       * http://docs.sequelizejs.com/en/v3/docs/models-definition/#defining-as-part-of-the-model-options
       */
      it('evaluates to the first 23 characters of the `content` appended with "..."', function () {

        expect(order.snippet).to.equal('The South African cliff...');

        order.content = 'At length did cross an Albatross / Thorough the fog it came';
        expect(order.snippet).to.equal('At length did cross an ...');

        order.content = 'The Albatross fell off, and sank / Like lead into the sea';
        expect(order.snippet).to.equal('The Albatross fell off,...');

      });

      // This is mostly to avoid a corner case seen during `Model.update`.
      it('returns empty string for missing `content`', function(){

        order.content = undefined;

        expect(order.snippet).to.equal('');

      });

    });

    describe('`truncate` instance method', function(){

      /**
       * Set up an instance method (check out sequelize instanceMethods) called `truncate`
       * that will shorten (change!) the order instance content to a passed-in length.
       * This method does not save to the backend, it just modifies the Sequelize
       * object so the user can choose if and when to actually save.
       *
       * http://docs.sequelizejs.com/en/v3/docs/models-definition/#expansion-of-models
       */
      it('truncates the `content`', function () {

        expect(order.content).to.equal(fullText);

        order.truncate(12);
        expect(order.content).to.equal('The South Af');

      });

      it('accepts any length', function () {

        expect(order.content).to.equal(fullText);

        var randLength = Math.ceil(Math.random() * 20);
        order.truncate(randLength);
        expect(order.content).to.have.length(randLength);

      });

      it('does not save the instance once truncated', function() {

        expect(order.content).to.equal(fullText);

        order.truncate(7);
        expect(order.content).to.have.length(7);

        return Order.findAll()
          .then(function(orders) {
            expect(orders).to.have.length(0);
          });

      });

    });

    describe('`findByTitle` class method', function(){

      /**
       * Set up a class method called `findByTitle` that's a convenience
       * method to find a *single* document by its title.
       *
       * http://docs.sequelizejs.com/en/v3/docs/models-definition/#expansion-of-models
       */

      beforeEach(function(){
        var otherOrders = [1, 2, 3].map(function (num) {
          return Order.create({
            title: 'Order Number ' + num,
            content: 'etc.'
          });
        });
        var orders = otherOrders.concat(order.save());
        return Promise.all(orders);
      });

      it('finds one specific order by its `title`', function () {

        return Order.findByTitle('Migratory Birds')
          .then(function (foundOrder) {
            expect(foundOrder).not.to.be.an.instanceOf(Array);
            expect(foundOrder.content).to.equal(fullText);
          });

      });

    });

  });

  describe('associations', function(){

    /**
     * Add a `belongsTo` relationship between orders and users,
     * but make sure the user is aliased as `author` for each order.
     *
     * http://docs.sequelizejs.com/en/v3/docs/associations/#belongsto
     */

    it("belongs to a user, who is stored as the order's `author`", function() {

      var creatingUser = User.create({ name: 'Alatar the Blue'});
      var creatingOrder = Order.create({
        title: 'Blue Wizards',
        content: 'They are two of the five Wizards (or Istari) sent by the Valar to Middle-earth to aid in the struggle against Sauron.'
      });

      return Promise.all([creatingUser, creatingOrder])
        .spread(function(createdUser, createdOrder) {
          // this method `setAuthor` method automatically exists if you set up the association correctly
          return createdOrder.setAuthor(createdUser);
        })
        .then(function() {
          return Order.findOne({
            where: { title: 'Blue Wizards' },
            include: { model: User, as: 'author' }
          });
        })
        .then(function(foundOrder){
          expect(foundOrder.author).to.exist; // eslint-disable-line no-unused-expressions
          expect(foundOrder.author.name).to.equal('Alatar the Blue');
        });

    });

  });

  /**
   * Your model should have a field called `version`,
   * which increases by 1 every time you save
   *
   * http://docs.sequelizejs.com/en/v3/docs/hooks/
   */

  describe('`version` field', function() {

    beforeEach(function() {
      return Order.create({
        title: 'Biological Immortality',
        content: 'Biological immortality refers to a stable or decreasing rate of mortality from senescence, thus decoupling it from chronological age.'
      });
    });

    it('is originally 0, even if not explicitly set', function() {

      return Order.findOne({where: {title: 'Biological Immortality'}})
        .then(function(foundOrder) {
          expect(foundOrder.version).to.equal(0);
        });

    });

    it('increments by 1 every time the order is updated', function() {

      return Order.findOne({where: {title: 'Biological Immortality'}})
        .then(function(foundOrder) {
          expect(foundOrder.version).to.equal(0);
          return foundOrder.update({
            content: 'Biological immortality is a lie!'
          });
        })
        .then(function(updatedOrder) {
          expect(updatedOrder.version).to.equal(1);
          return updatedOrder.update({
            content: 'Have you seen the 19th century painting of Keanu Reeves?'
          });
        })
        .then(function(updatedOrder) {
          expect(updatedOrder.version).to.equal(2);
        });

    });

  });

  describe('extra credit `tags` field', function(){

    /** EXTRA CREDIT
     * Your Order model should have a tag field that's an array, but when we
     * access it, we should get one string: the tags joined by a comma and space
     *
     * Look at getters and setters:
     * http://docs.sequelizejs.com/en/v3/docs/models-definition/#getters-setters
     *
     * To activate this spec, change `xit` to `it`
     */
    it('is a custom getter', function () {

      // tags should have a `defaultValue` that is an empty array.
      expect(Order.attributes.tags.defaultValue).to.deep.equal([]);

      // main functionality of tags
      return Order.create({
        title: 'Taggy',
        content: 'So Taggy',
        tags: ['tag1', 'tag2', 'tag3']
      })
        .then(function (createdOrder) {
          expect(createdOrder.tags).to.equal('tag1, tag2, tag3');
        });

    });

  });

});
