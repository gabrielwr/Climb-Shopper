import React from 'react'
import { Link } from 'react-router'
import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import Review from './Review'

class AllProducts extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
     return (
        <div>
          {
            this.props.products.map(product => (
            <Link to = {`/products/${product.id}`}>{product.name}</Link>
            ))
          }
        </div>
        )
  }
}
export default connect(
  state => ({ products: state.product.products }),
  {}
)(AllProducts)
