import React from 'react'
import { connect } from 'react-redux'

import { login } from 'APP/app/reducers/auth'
import store from 'App/app/store'

import formatPrice from 'APP/app/utils/priceFormatter'

/*------------------- COMPONENT -----------------*/
export class SingleProduct extends React.Component {

  constructor( props ) {
    super( props )

    this.state = {
      color: '',
      size: '',
      quantity: 0
    }

    this.handleInputChange = this.handleInputChange.bind( this )
  }

  handleInputChange( event ) {
    const target = event.target
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    console.log('in single product', this.props)
    const product = this.props.singleProduct
    const reviews = this.props.reviews

    return (
      <div>
        <div>
          <h2>{ product.name }</h2>
          <p>Price: { formatPrice(product.price) }</p>
          <div><p>{ product.description }</p></div>
          <button disabled={ this.state.color === '' || this.state.size === '' || this.state.quantity === 0 } >
            ADD TO CART </button>
        </div>
      </div>
    )
  }
}

/* ------------------- CONTAINER ----------------- */
const mapState = state => ({ singleProduct: state.product.selectedProduct })
const mapDispatch = null

export default connect( mapState, mapDispatch )( SingleProduct )
