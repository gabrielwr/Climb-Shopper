import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

const AllReviews = () => (
  <div>I am all the reviews</div>
)


export default connect(
  state => ({}),
  {}
)(AllReviews)
