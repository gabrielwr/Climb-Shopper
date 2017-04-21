'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
<<<<<<< HEAD
import AllProducts from './components/AllProducts'
=======
import Root from './components/Root'
>>>>>>> master
import Authenticate from './components/Authenticate'


const ExampleApp = connect(
  ({ auth }) => ({ user: auth }),

)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

const EmptyApp = connect(
  ({ }) => ({ })
)(
  ({ children}) =>
    <div>Hey there, replace with me an actual root element
    {children}
    </div>

  ({children }) =>
    <div>Hey there, hows it going whatcha doin
    {children}
    </div>
)

const allProductsOnEnter = () => {
  // axios.get('/api')
}

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ EmptyApp }>

        <Route path="/products" onEnter={ allProductsOnEnter } component={ AllProducts } />
        {/*products/add is an admin only view*/}
        <Route path="/products/add" component={ EmptyApp } />
      <Route path="/" component={ Root }>
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
