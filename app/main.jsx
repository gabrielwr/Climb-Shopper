'use strict'

// Additional Libraries
import axios from 'axios'

// React Imports
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import store from './store'

// Root Imports
import Root from './components/Root'

// Home Imports
import Home from './components/Home/Home'

// Product Imports
import AllProducts, { setProducts } from './components/Products/AllProducts'
import SingleProduct from './components/SingleProduct/SingleProduct'
import { fetchProducts, fetchSingleProduct } from './reducers/product'

// Cart Imports
import Cart from './components/Cart/Cart'
import { setCurrentOrder, fetchSessionOrder, mergeCurrentOrder } from './reducers/order'

// Authentication Imports
import Authenticate from './components/Authentication/Authenticate'
import Login from './components/Authentication/Login'
import NotFound from './components/NotFound'
import WhoAmI from './components/Authentication/WhoAmI'
import { whoami } from './reducers/auth'

const fetchInitialData = (nextRouterState) => {
  // Dispatching whoami first ensures user is authenticated.
  store.dispatch(whoami())
    .then(() => {
      // load the correct data based on the state's auth property
      const authenticatedUser = store.getState().auth
      if (authenticatedUser.id) {
        //if user is loaded to state, merge session order
        //with authenticated users order
        const sessionOrder = store.getState().order.currentOrder
        store.dispatch(mergeCurrentOrder(authenticatedUser.orders[0], sessionOrder))
      } else {
        //otherwise, fetch all products and the session order
        store.dispatch(fetchProducts())
        store.dispatch(fetchSessionOrder())
      }
    })
}

const onProductEnter = nextRouterState => {
  const productId = nextRouterState.params.id
  store.dispatch( fetchSingleProduct( productId ) )
}

const fetchAllProducts = () => {
  store.dispatch(fetchProducts())
}

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Root } onEnter={ fetchInitialData }>
        <Route path="/products" component={ AllProducts } onEnter={ fetchAllProducts } />
        <Route path="/products/:id" component={ SingleProduct } onEnter = { onProductEnter }/>
        <Route path="/cart" component={ Cart } />
        <Route path="/authenticate" component={ Authenticate } />
        <IndexRoute component={ Home } />
      </Route>
      <Route path='*' component={ NotFound } />
    </Router>
  </Provider>,
  document.getElementById('main'),
  null
)
