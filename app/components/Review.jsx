import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

const Review = () => (
  <div>I am a review</div>
)


export default connect(
  state => ({}),
  {}
)(Review)
