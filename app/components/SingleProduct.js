import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

const SingleProduct = (props) => (
  <div>
    <h2>{props.singleProduct.name}</h2>
    <h3>Rest of the product description</h3>
  </div>

)

export default connect(
  state => ({singleProduct: state.selectedProduct}),
  {}
)(SingleProduct)
