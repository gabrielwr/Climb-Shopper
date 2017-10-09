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
    email: 'akim@na.com',
    user_name: 'akim',
    password: '123',
    is_admin: false
  },
  kathy: {
    first_name: 'Kathy',
    last_name: 'Bailey',
    email: 'kbai@go.com',
    user_name: 'kbailey',
    password: '123',
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
  red_rock_sport: {
    name: 'Red Rock Canyon Sport',
    category: 'Sport',
    price: 135900,
    images: '1.jpg',
    quantity: 5,
    description: 'What a wonderful place. Just selling the sport climbs!'
  },
  el_chorro: {
    name: 'El Chorro',
    category: 'Sport',
    price: 185900,
    images: '2.jpg',
    quantity: 5,
    description: 'Come experience the beautiful limestone cliffs of El Chorro in southern Spain'
  },
  ceuse: {
    name: 'Ceuse',
    category: 'Sport',
    price: 135900,
    images: '3.jpg',
    quantity: 5,
    description: 'Come take in the breathtaking views and climbing in the south of France.'
  },
  torres_del_paine: {
    name: 'Torres Del Paine',
    category: 'Trad',
    price: 210051,
    images: '4.jpg',
    quantity: 10,
    description: 'One of the great beauties of the world'
  },
  yosemite: {
    name: 'Yosemite National Park',
    category: 'Trad',
    price: 20010051,
    images: '5.jpg',
    quantity: 1,
    description: 'Mecca. Come try your hand on the legendary walls of Yosemite'
  },
  red_rock_trad: {
    name: 'Red Rock Canyon Trad',
    category: 'Trad',
    price: 210051,
    images: '1.jpg',
    quantity: 4,
    description: 'Neighboring some of the best sport climbing in the world is some of the best trad climbing in the world. Treat yourself.'
  },
  rocky_mountain: {
    name: 'Rocky Mountain National Park',
    category: 'Bouldering',
    price: 210052,
    images: '6.jpg',
    quantity: 4,
    description: 'High mountains, perfect bouldering'
  },
  bishop: {
    name: 'Bishop',
    category: 'Bouldering',
    price: 40052,
    images: '7.jpg',
    quantity: 4,
    description: 'Bouldering set to the back drop of the Californian high mountains. Spectacular, hard, scary, and most of all -- fun.'
  },
  hueco_tanks: {
    name: 'Hueco Tanks State Park',
    category: 'Bouldering',
    price: 400052,
    images: '8.jpg',
    quantity: 3,
    description: 'The birthplace of hardcore bouldering-- the one and only Hueco Tanks'
  },
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
    'orderOne has Torres Del Paine': {
      price: 210051,
      quantity: 2,
      order_id: orders.orderOne.id,
      product_id: products.torres_del_paine.id
    },
    'orderTwo has Torres Del Paine': {
      price: 160051,
      quantity: 1,
      order_id: orders.orderTwo.id,
      product_id: products.torres_del_paine.id
    },
    'orderThree has Red Rock sport climbing': {
      price: 210052,
      quantity: 1,
      order_id: orders.orderThree.id,
      product_id: products.red_rock_sport.id
    },
    'orderThree has Rocky Mountain National Park': {
      price: 210053,
      quantity: 1,
      order_id: orders.orderThree.id,
      product_id: products.rocky_mountain.id
    },
    'orderFour has Rocky Mountain National Park': {
      price: 150004,
      quantity: 3,
      order_id: orders.orderFour.id,
      product_id: products.rocky_mountain.id
    },
    'orderFour has Red Rock sport climbing': {
      price: 210058,
      quantity: 2,
      order_id: orders.orderFour.id,
      product_id: products.red_rock_sport.id
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
