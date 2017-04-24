'use strict'

// Additional Libraries
import axios from 'axios'

// React Imports
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import store from './store'

// Root Imports
import Root from './components/Root'

// Product Imports
import AllProducts, { setProducts } from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import { fetchProducts } from './reducers/product'

// User Imports
import AllUsers from './components/AllUsers'
import SingleUser from './components/SingleUser'

// Cart Imports
import Cart from './components/Cart'
import { setCurrentOrder, fetchSessionOrder, mergeCurrentOrder } from './reducers/order'

// Authentication Imports
import Authenticate from './components/Authenticate'
import Login from './components/Login'
import NotFound from './components/NotFound'
import WhoAmI from './components/WhoAmI'
import { whoami } from './reducers/auth'

const EmptyApp = connect(
  ({}) => ({})
)(
  ({}) =>
  <div>
    I am the EmptyApp
  </div>
)

const fetchInitialData = (nextRouterState) => {
  // Dispatching whoami first ensures user is authenticated.
  store.dispatch(whoami())
    .then(() => {
      // load the correct data based on the state's auth property
      const authenticatedUser = store.getState().auth
      if (authenticatedUser.id) {
        const sessionOrder = store.getState().order.currentOrder
        store.dispatch(mergeCurrentOrder(authenticatedUser.orders[0], sessionOrder))
      } else {
        store.dispatch(fetchProducts())
        store.dispatch(fetchSessionOrder())
      }
    })
}

// const onAppEnter = () => {
//   Promise.all([
//     axios.get('/api/products'),
//     axios.get('/api/reviews'),
//   ])
//   .then(responses => responses.map(r => r.data))
//   .then(([products, reviews]) => {
//     store.dispatch(setProducts(products))
//     store.dispatch(setReviews(reviews))
//   })
//   .catch(console.error)
// }


render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Root } onEnter={ fetchInitialData }>
        <Route path="/products" component={ AllProducts } />
        {/*products/add is an admin only view*/}
        <Route path="/products/add" component={ EmptyApp } />
        <Route path="/products/:id" component={ SingleProduct } />
        <Route path="/users" component={ AllUsers } />
        <Route path="/users/:id" component={ EmptyApp } />
        <Route path="/users" component={ EmptyApp } />
        <Route path="/users/:id" component={ SingleUser } />
        <Route path="/account" component={ EmptyApp } />
        <Route path="/cart" component={ Cart } />
        <Route path="/orders" component={ EmptyApp } />
        <Route path="/orders/:id" component={ EmptyApp } />
        <Route path="/authenticate" component={ Authenticate } />
      </Route>
      <Route path='*' component={ NotFound } />
    </Router>
  </Provider>,
  document.getElementById('main')
)
