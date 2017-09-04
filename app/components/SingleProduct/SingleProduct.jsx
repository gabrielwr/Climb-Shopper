import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { login } from 'APP/app/reducers/auth'
import store from 'App/app/store'
import { addProductToOrder } from 'APP/app/reducers/product'
import { deleteItemFromDatabase, addItemToOrder } from 'APP/app/reducers/order'

import CartButton from './CartButton'
import formatPrice from 'APP/app/utils/priceFormatter'
import { Flex, Box } from 'grid-styled'


const H1 = styled.h1`

`

const H3 = styled.h3`

`



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
        <Flex>
          <Box width={1/3} p={[1, 2, 3, 4]}>
            <header>
              <H1>{ product.name }</H1>
              <H3>{ product.description }</H3>
              <div>
                <price>{formatPrice(product.price)}</price>
                <CartButton
                  iconName='remove'
                  handleClick={this.props.deleteItemFromDatabase.bind(this)}
                  text='Remove'
                />
              </div>
            </header>
          </Box>
          <Box width={2/3}>
            <h1>test</h1>
            <div>
              { product.image &&
                <img
                  src={`/images/Products/${product.image}`}
                  alt={product.name}
                />
              }
            </div>
          </Box>
        </Flex>
      </article>
    )
  }
}

/* ------------------- CONTAINER ----------------- */
const mapState = state => ({ singleProduct: state.product.selectedProduct })

const mapDispatch = {
  deleteItemFromDatabase,
  addProductToOrder
}

export default connect( mapState, mapDispatch )( SingleProduct )


/* <CartButton
iconName='shopping-cart'
handleClick={ null }
text='Add to Cart'
/>*/
