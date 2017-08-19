import React from 'react'
import { connect } from 'react-redux'

import { logout } from 'APP/app/reducers/auth'

/* -----------------    COMPONENT     ------------------ */
export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-name">{ user && user.name }</span>
    <button className="logout" onClick={ logout }>Logout</button>
  </div>
)

/* -----------------    CONTAINER     ------------------ */
const mapState = ({ auth }) => ({ user: auth })
const mapDispatch = { logout }

export default connect( mapState, mapDispatch )( WhoAmI )
