import React from 'react'
import { connect } from 'react-redux'

import { login } from 'APP/app/reducers/auth'
import store from 'App/app/store'

import formatPrice from 'APP/app/utils/priceFormatter'

/*------------------- COMPONENT -----------------*/
export class SingleProduct extends React.Component {
  constructor( props ) {
    super( props )
  }
  render() {
    const product = this.props.singleProduct
    const reviews = this.props.reviews
    console.log('product is:', product)
    return (
      <div>
        <h2>{ product.name }</h2>
        <p>Price: { formatPrice(product.price) }</p>
        <div><p>{ product.description }</p></div>
        <button>ADD TO CART</button>
      </div>
    )
  }
}

/* ------------------- CONTAINER ----------------- */
const mapState = state => ({ singleProduct: state.product.selectedProduct })

//update mapDispatch so that it sends to cart
const mapDispatch = null

export default connect( mapState, mapDispatch )( SingleProduct )
