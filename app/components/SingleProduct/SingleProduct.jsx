import React from 'react'
import { connect } from 'react-redux'

import { login } from 'APP/app/reducers/auth'
import store from 'App/app/store'
import { addProductToOrder } from 'APP/app/reducers/product'
import { deleteItemFromDatabase, addItemToOrder } from 'APP/app/reducers/order'

import CartButton from './CartButton'
import formatPrice from 'APP/app/utils/priceFormatter'

/*------------------- COMPONENT -----------------*/
export class SingleProduct extends React.Component {
  constructor( props ) {
    super( props )
  }
  render() {
    console.log('props are:', this.props)
    const product = this.props.singleProduct
    const reviews = this.props.reviews
    return (
      <article>
        <header>
          <h1>{ product.name }</h1>
          <h2>{ product.description }</h2>
          <div>
            <price>{formatPrice(product.price)}</price>
            <CartButton
              iconName='remove'
              handleClick={this.props.deleteItemFromDatabase.bind(this, item.product_id)}
              text='Remove'
            />
            <CartButton
              iconName='shopping-cart'
              handleClick={ null }
              text='Add to Cart'
            />
            } */}

          </div>
        </header>
        <div>
          { product.image &&
            <img
              src={`/images/Products/${product.image}`}
              alt={product.name}
            />
          }
        </div>
      </article>
    )
  }
}

/* ------------------- CONTAINER ----------------- */
const mapState = state => ({ singleProduct: state.product.selectedProduct })

const mapDispatch = {
  removeProduct,
  addProductToOrder
}

export default connect( mapState, mapDispatch )( SingleProduct )
