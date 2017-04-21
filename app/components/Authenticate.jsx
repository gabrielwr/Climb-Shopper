import React from 'react'

export const Authenticate = ({ login, logout }) => (
  <div>
  <Login />
  <form action="/api/auth/login/google">
    <input type="submit" value="Login with Google" />
  </form>
  <form action="/api/auth/login/facebook">
    <input type="submit" value="Login with Facebook" />
  </form>
  <button
    onClick ={evt => {
      evt.preventDefault()
      logout()
    }
    }
    type="button">
    Log Out!
  </button>

  </div>
)

import Login from './Login'
import { login, logout } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export default connect(
  state => ({}), { login, logout },
)(Authenticate)
