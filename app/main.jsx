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
import AllProducts from './components/AllProducts'

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
)

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ EmptyApp }>
        {/* Maybe...
        <Route path="/products" component={ All }>
          <Route path='add' component={ TheAddPartOfThatView } />
          <Route path=':id' component={ SOMETHING } />
          <IndexRoute component={ SOMETHING } />
        </Route>
        */}

        <Route path="/products" component={ AllProducts } />
        {/*products/add is an admin only view*/}
        <Route path="/products/add" component={ EmptyApp } />
        <Route path="/products/:id" component={ EmptyApp } />
        <Route path="/users" component={ EmptyApp } />
        <Route path="/users/:id" component={ EmptyApp } />
        <Route path="/account" component={ EmptyApp } />
        <Route path="/cart" component={ EmptyApp } />
        <Route path="/orders" component={ EmptyApp } />
        <Route path="/orders/:id" component={ EmptyApp } />
        <Route path="/review" component={ EmptyApp } />
        <Route path="/authenticate" component={ EmptyApp } />
      </Route>
      <Route path='*' component={ NotFound } />
    </Router>
  </Provider>,
  document.getElementById('main')
)
