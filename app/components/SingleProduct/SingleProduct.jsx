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
      <article>
        <header>
          <h1>{product.name}</h1>
          <h2>{product.description}</h2>
          <div>
            <price>{formatPrice(product.price)}</price>
            {/* {(orderItems &&
              orderItems.filter(i => i.product_id === product.id).length)
              ?<SingleProductButton
              iconName='remove'
              handleClick={this.deleteItemFromDatabase.bind(this, item.product_id)}
              text='Remove'
              />
              :<SingleProductButton
              iconName='shopping-cart'
              handleClick={this.addItemToOrder.bind(this, item)}
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

//update mapDispatch so that it sends to cart
const mapDispatch = null

export default connect( mapState, mapDispatch )( SingleProduct )
