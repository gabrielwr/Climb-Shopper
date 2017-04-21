'use strict'

// Additional Libraries
import axios from 'axios'

// React Imports
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

// Components
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import AllProducts, { setProducts } from './components/AllProducts'
import Root from './components/Root'
import Authenticate from './components/Authenticate'

import store from './store'

const EmptyApp = connect(
  ({ }) => ({ })
)(
  ({ }) =>
    <div>
    </div>
)

const onAppEnter = () => {
  Promise.all([
    axios.get('/api/products'),
    axios.get('/api/reviews'),
  ])
  .then(responses => responses.map(r => r.data))
  .then(([ products, reviews ]) => {
    store.dispatch(setProducts(products))
    store.dispatch(setReviews(reviews))
  })
  .catch(console.error)
}


const allProductsOnEnter = () => {
  // axios.get('/api')
}

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Root } onEnter={ onAppEnter }>
        <Route path="/products" onEnter={ allProductsOnEnter } component={ AllProducts } />
        {/*products/add is an admin only view*/}
        <Route path="/products/add" component={ EmptyApp } />
        <Route path="/products" component={ EmptyApp } />
        <Route path="/products/:id" component={ EmptyApp } />
        <Route path="/users" component={ EmptyApp } />
        <Route path="/users/:id" component={ EmptyApp } />
        <Route path="/account" component={ EmptyApp } />
        <Route path="/cart" component={ EmptyApp } />
        <Route path="/orders" component={ EmptyApp } />
        <Route path="/orders/:id" component={ EmptyApp } />
        <Route path="/review" component={ EmptyApp } />
        <Route path="/authenticate" component={ Authenticate } />
      </Route>
      <Route path='*' component={ NotFound } />
    </Router>
  </Provider>,
  document.getElementById('main')
)
