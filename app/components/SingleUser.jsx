import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

const SingleUser = (props) => (
  <div>
    <h2>User name</h2>
    <h3>Rest of the user description</h3>
  </div>

)

export default connect(
  state => ({singleUser: state.selectedUser}),
  {}
)(SingleUser)
