'use strict'

/*
* To Seed Your Local Database
* Check Postico... do you have a lisas-bikes database?
* NO: npm run dev will create the database
* YES: npm run seed
*/

const db = require('APP/db'),
  { User, Product, Review, Order, Item, Promise } = db,
  { mapValues } = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products(),
  }

  seeded.orders = orders(seeded)
  seeded.items = items(seeded)
  seeded.reviews = reviews(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  adam: {
    first_name: 'Adam',
    last_name: 'Kim',
    email: 'akim0@nationalgeographic.com',
    user_name: 'akim',
    password: 'ZzWHy0ZHRut',
    is_admin: false
  },
  kathy: {
    first_name: 'Kathy',
    last_name: 'Bailey',
    email: 'kbailey1@army.mil',
    user_name: 'kbailey',
    password: 'aSyjEu',
    is_admin: false
  },
  deborah: {
    first_name: 'Deborah ',
    last_name: 'Walker',
    email: 'dwalker2@ning.com',
    user_name: 'dwalker',
    password: 'aJA7P3',
    is_admin: true
  }
})

const products = seed(Product, {
  road: {
    name: 'RoadMaster X-Treme',
    category: 'Road',
    price: 1359.99,
    color: 'Khaki',
    size: 'Medium',
    images: ['http://www.placegoat.com/200/200', 'http://www.placecat.com/200/200'],
    quantity: 7480,
    reviewStars: 3.9,
    description: 'SO EXTREME YOUR FACE WILL MELT! us vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in'
  },
  mountainLarge: {
    name: 'Mount-Pain X-FIRE',
    category: 'Mountain',
    price: 2100.51,
    color: 'Red',
    size: 'Large',
    images: ['http://www.placegoat.com/200/200', 'http://www.placecat.com/200/200'],
    quantity: 2403,
    reviewStars: 3.9,
    description: 'SUCH PAIN AHHH! us vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in'
  },
  mountainMedium: {
    name: 'Mount-Pain X-FIRE',
    category: 'Mountain',
    price: 2100.52,
    color: 'Red',
    size: 'Medium',
    images: ['http://www.placegoat.com/200/200', 'http://www.placecat.com/200/200'],
    quantity: 2403,
    reviewStars: 3.2,
    description: 'SUCH PAIN AHHH! MEDIUM IS ON THE SMALL SIDE OF THINGS! us vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in'
  }
})

const orders = seed(Order,
  ({ users }) => ({
    orderOne: {
      status: 'Pending',
      user_id: users.adam.id
    },
    orderTwo: {
      status: 'Pending',
      user_id: users.kathy.id
    },
    orderThree: {
      status: 'Pending',
      user_id: users.deborah.id
    },
    orderFour: {
      status: 'Complete',
      user_id: users.kathy.id
    },
  })
)

const items = seed(Item,
  ({ orders, products }) => ({
    'orderOne has two Medium Mountain Bikes': {
      price: 210051,
      quantity: 2,
      order_id: orders.orderOne.id,
      product_id: products.mountainMedium.id
    },
    'orderTwo has one discounted Medium Mountain Bikes': {
      price: 160051,
      quantity: 1,
      order_id: orders.orderTwo.id,
      product_id: products.mountainMedium.id
    },
    'orderThree has one Road Bike': {
      price: 210052,
      quantity: 1,
      order_id: orders.orderThree.id,
      product_id: products.road.id
    },
    'orderThree has one Large Mountain Bike ': {
      price: 210053,
      quantity: 1,
      order_id: orders.orderThree.id,
      product_id: products.mountainLarge.id
    },
    'orderFour has three discounted Large Mountain Bike ': {
      price: 150004,
      quantity: 3,
      order_id: orders.orderFour.id,
      product_id: products.mountainLarge.id
    },
    'orderFour has two Medium Mountain Bike ': {
      price: 210058,
      quantity: 2,
      order_id: orders.orderFour.id,
      product_id: products.mountainMedium.id
    },
  })
)

const reviews = seed(Review,
  ({ users, products }) => ({
    'dope bikez': {
      title: 'Dope Bikez',
      content: 'This bike is so dope, it is a firecracker under my keister (sp?)',
      num_stars: 5,
      user_id: users.adam.id,
      product_id: products.mountainMedium.id
    },
    'this bike is trash': {
      title: 'Too Expensive!',
      content: 'I cannot believe how expensive this is. It barely goes 15 mph.  No motor. Bad.',
      num_stars: 1,
      user_id: users.deborah.id,
      product_id: products.road.id
    },
    'my kids love it': {
      title: 'gud starter bik',
      content: 'my childern lov there chrismat prasnt. thanks',
      num_stars: 2,
      user_id: users.kathy.id,
      product_id: products.road.id
    },
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({ force: true }))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others = {}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
          // Is other a function? If so, call it. Otherwise, leave it alone.
          typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
        .map(key => {
          const row = rows[key]
          return {
            key,
            value: Promise.props(row)
              .then(row => Model.create(row)
                .catch(error => {
                  throw new BadRow(key, row, error)
                })
              )
          }
        }).reduce(
          (all, one) => Object.assign({}, all, {
            [one.key]: one.value
          }), {}
        )
      ))
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, { users, orders, items,products,reviews })
