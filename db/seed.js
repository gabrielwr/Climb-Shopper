'use strict'

/*
* To Seed Your Local Database
* Check Postico... do you have a climbshopper database?
* NO: npm run dev will create the database
* YES: npm run seed
*/

const db = require('APP/db'),
  { User, Product, Order, Item, Promise } = db,
  { mapValues } = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products(),
  }

  seeded.orders = orders(seeded)
  seeded.items = items(seeded)

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
    first_name: 'Deborah',
    last_name: 'Walker',
    email: 'dwalker2@ning.com',
    user_name: 'dwalker',
    password: 'aJA7P3',
    is_admin: true
  }
})

const products = seed(Product, {
  red_rock: {
    name: 'Red Rock Canyon',
    category: 'Sport',
    price: 135900,
    images: ['image placeholder'],
    quantity: 5,
    description: 'What a wonderful place. Just selling the sport climbs!'
  },
  torres_del_paine: {
    name: 'Torres Del Paine',
    category: 'Trad',
    price: 210051,
    images: ['image placeholder'],
    quantity: 10,
    description: 'One of the great beauties of the world'
  },
  rocky_mountain: {
    name: 'Rocky Mountain National Park',
    category: 'Bouldering',
    price: 210052,
    images: ['Image placeholder'],
    quantity: 4,
    description: 'High mountains, perfect bouldering'
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

module.exports = Object.assign(seed, { users, orders, items, products })
