import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Flex, Box } from 'grid-styled'

import { login } from 'APP/app/reducers/auth'

import Item from './Item'

/* -----------------    COMPONENT     ------------------ */
export class AllProducts extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Flex wrap>
        {
          this.props.products && this.props.products.map(product => {
            console.log(product)
            return (<Box key={ product.id } width={1/3}><Item
              name={ product.name }
              price={ product.price }
              alt={ product.name }
              image={ product.images[0] }
            /></Box>
          )})
        }
      </Flex>
    )
  }
}

/* -----------------    CONTAINER    ------------------ */
const mapState = state => ({ products: state.product.products })
const mapDispatch = null

export default connect( mapState, mapDispatch )( AllProducts )
