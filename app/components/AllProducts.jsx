import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import Review from './Review'

const AllProducts = () => (
  <div>I am all the products</div>
)


export default connect(
  state => ({}),
  {}
)(AllProducts)
