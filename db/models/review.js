'use strict'
const Sequelize = require('sequelize')

module.exports = db => db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  num_stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports.associations = (Review, { Product, User }) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
}

const express = require('e'
express
');
const router = express.Router();
//look for the path!!--------------
const models = require('../models');
/* dont forget to change models name~~
 const Author = models.Author;
 const Book = models.Book;
 const Chapter = models.Chapter;
 */

router.param('id', (req, res, next, id) => {
  Book.findById(id)
    .then(book => {
      if (!book) {
        let err = new Error("Couldn't find the book.. :,( ");
        err.status = 404;
        return next(err);
      }
      else {
        req.book = book;
        next();
      }
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Book.findAll({
    where: req.query,
    include: [{all: true}]
  })
    .then((books) => res.send(books))
    .catch((err) => next(err));
});

router.get('/:id', (req, res, next) => {
  res.send(req.book);
});

router.get('/:id/chapters', (req, res, next) => {
  Chapter.findAll({
    where: {bookId: req.book.id}
  })
    .then(res.send.bind(res))
    .catch(next);
});


/*
 *   Although I already made req.param(chapterID) before, it would be a bit
 *  weird to use it in this request since req.chapter will be just applied
 *  on this request, without taking care of if the book id matches the chapter
 *  id.
 *   If i really wanted, I can name the :id and :chapterId differently for this
 * case so that req.param isn't applied for those two, even before jumping to
 * the request. (Because req.param works before any routers)
 *
 */

router.get('/:id/chapters/:chapterId', (req, res, next) => {
  Chapter.findOne({
    where: {
      bookId: req.params.id,
      id: req.params.chapterId
    }
  })
    .then(foundChapter => {
      if (!foundChapter) {
        let err = new Error("There's no chapter for ya.. :,( ");
        err.status = 404;
        return next(err);
      }
      else {
        res.send(foundChapter);
      }
    })
    .catch(next);
});


router.post('/', (req, res, next) => {
  Book.create(req.body)
    .then(book => {
      res.status(201).send(book);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  req.book.update(req.body)
    .then(updatedBook => {
      res.send(updatedBook);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  req.book.destroy()
    .then(() => res.status(204).end())
    .catch(next);

});

router.post('/:id/chapters', (req, res, next) => {
  // req.body.bookId = req.book.id;
  Chapter.create(req.body)
    .then(created => {
      return created.setBook(req.book.id)
    })
    .then(createdChapterWithBook => {
      res.status(201);
      res.send(createdChapterWithBook);
    })
    .catch(next);
});

router.put('/:id/chapters/:chapterId', (req, res, next) => {
  Chapter.findOne({
    where: {
      bookId: req.book.id,
      id: req.params.chapterId
    }
  })
    .then(foundChapter => {
      if (!foundChapter) {
        let err = new Error("There's no chapter for ya.. :,( ");
        err.status = 404;
        return next(err);
      }
      else {
        foundChapter.update(req.body)
          .then(updatedChapter => {
            res.send(updatedChapter);
          })
      }
    })
    .catch(next);
});

router.delete('/:id/chapters/:chapterId', (req, res, next) => {
  Chapter.findOne({
    where: {
      bookId: req.book.id,
      id: req.params.chapterId
    }
  })
    .then(foundChapter => {
      if (!foundChapter) {
        let err = new Error("Why would you want to delete a chapter which doesn't even exist... idiot~~ :p ");
        err.status = 404;
        return next(err);
      }
      foundChapter.destroy()
        .then(() => res.status(204).end())
    })
    .catch(next);
});


module.exports = router;


