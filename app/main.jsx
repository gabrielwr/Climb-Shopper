'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import AllProducts from './components/AllProducts'
import AllReviews from './components/AllReviews'
import Root from './components/Root'
import Authenticate from './components/Authenticate'
import { fetchPastOrders, fetchCurrentOrder } from './reducers/order'
import {whoami} from './reducers/auth'


const EmptyApp = connect(
  ({}) => ({})
)(
  ({}) =>
  <div>
  </div>
)

const fetchInitialData = (nextRouterState) => {
  // Set the auth info at start
  store.dispatch(whoami())
  .then(()=>console.log('beer'))
  store.dispatch(fetchPastOrders())
  store.dispatch(fetchCurrentOrder(nextRouterState.params.id))
}

const allProductsOnEnter = () => {
  // axios.get('/api')
}

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" onEnter = { fetchInitialData } component={ Root }>
        <Route path="/products" onEnter={ allProductsOnEnter } component={ AllProducts } />
        {/*products/add is an admin only view*/}
        <Route path="/products/add" component={ EmptyApp } />
        <Route path="/products/:id" component={ EmptyApp } />
        <Route path="/users" component={ EmptyApp } />
        <Route path="/users/:id" component={ EmptyApp } />
        <Route path="/account" component={ EmptyApp } />
        <Route path="/cart" component={ EmptyApp } />
        <Route path="/orders" component={ EmptyApp } />
        <Route path="/orders/:id" component={ EmptyApp } />
        <Route path="/review" component={ AllReviews } />
        <Route path="/authenticate" component={ Authenticate } />
      </Route>
      <Route path='*' component={ NotFound } />
    </Router>
  </Provider>,
  document.getElementById('main')
)
