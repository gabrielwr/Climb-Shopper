import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

const AllUsers = () => (
  <div>I am all the users</div>
)


export default connect(
  state => ({}),
  {}
)(AllUsers)
