'use strict'

const db = require('APP/db'),
  { Review } = db,
  { expect } = require('chai'),
  Promise = require('bluebird')

describe('The `Review` model', () => {
  /**
   * First we clear the database and recreate the tables before beginning a run
   */
  before('Await database sync', () => db.didSync)

  /**
   * Next, we create an (un-saved!) Review instance before every spec
   */
  let review
  beforeEach(() => {
    review = Review.build({
      title: "Funny Bike!",
      content: "It makes weird noise every time I ride it. haha funny",
      num_stars: 4.5
    })
  })

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      Review.truncate({cascade: true})
    ])
  })

  describe('attributes definition', () => {

    it('included `title`, `content`, `num_stars` fields', () => {
      return Review.save()
        .then(savedReview => {
          expect(savedReview.title).to.equal("Funny Bike!")
          expect(savedReview.content).to.equal("It makes weird noise every time I ride it. haha funny")
          expect(savedReview.num_stars).to.equal(4.5)
        })
    })
  })

  describe('validations', () => {
    it('requires `title`', () => {
      review.title = null
      return review.validate()
        .then(result => {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('title cannot be null')
        })
    })

    it('errors if `title` is not a String', () => {
      review.title = 12345
      return review.validate()
        .then(result => {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('title type should be String')
        })
    })

    it('requires `content`', () => {

      review.content = null

      return review.validate()
        .then(result => {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('content cannot be null')
        })
    })

    it('can handle long `content`', () => {

      let reviewContent = 'MountainBike (stylized with an interpunct as MountainBike) is a 2008 American computer-animated science-fiction comedy film produced by Pixar Animation Studios and released by Walt Disney Pictures. Directed by Andrew Stanton, the story follows a robot named WALL-E, who is designed to clean up an abandoned, waste-covered Earth far in the future. He falls in love with another robot named EVE, who also has a programmed task, and follows her into outer space on an adventure that changes the destiny of both his kind and humanity. Both robots exhibit an appearance of free will and emotions similar to humans, which develop further as the film progresses.';

      return Review.create({
        title: 'MountainBike',
        content: reviewContent,
        num_stars: 4.9
      })
        .then(result => {
          expect(result).to.be.an('object')
          expect(result.title).to.equal('MountainBike')
          expect(result.content).to.equal(reviewContent)
        })
    })

    it('requires `num_stars`', () => {

      review.num_stars = null

      return review.validate()
        .then(result => {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('num_stars cannot be null')
        })
    })

    it('errors if `num_stars` is less than or equal to zero', () => {

      review.num_stars = -1

      return review.validate()
        .then(result => {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('num_stars cannot be less than or equal to 0')
        })
    })

    it('errors if `num_stars` is greater than 5 ', () => {

      review.num_stars = 7

      return review.validate()
        .then(result => {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain('num_stars cannot be greater than 5')
        })
    })

    it('requires `num_stars` to be a float number with one digit decimal', () => {

      review.num_stars = 3.45

      return review.validate()
        .then(result => {
          expect(result).to.be.an.instanceOf(Error)
          expect(result.message).to.contain(`num_stars cannot have more than one digit decimal`)
        })
    })
  })
})
