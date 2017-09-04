import React from 'react'
import { connect } from 'react-redux'

import Login from './Login'
import { login, logout } from 'APP/app/reducers/auth'

/* -----------------    COMPONENT     ------------------ */
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
      onClick ={ evt => {
          evt.preventDefault()
          logout()
        }
      }
      type="button">
      Log Out!
    </button>
  </div>
)

/* -----------------    CONTAINER     ------------------ */
const mapState = state => ({})
const mapDispatch = { login, logout }

export default connect( mapState, mapDispatch )( Authenticate )
