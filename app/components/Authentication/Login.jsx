import React from 'react'
import { connect } from 'react-redux'

import { login } from 'APP/app/reducers/auth'

/* -----------------    COMPONENT     ------------------ */
export const Login = ({ login }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    login( evt.target.username.value, evt.target.password.value )
  }}>
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />
  </form>
)

/* -----------------    CONTAINER     ------------------ */
const mapState = state => ({})
const mapDispatch = { loginUser: login }

export default connect( mapState, mapDispatch )( Login )
