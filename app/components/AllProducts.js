import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

export const AllProducts = ({ products }) => (
  <div>I am all the products</div>
)


export default connect(
  state => ({}),
  {}
)(AllProducts)
