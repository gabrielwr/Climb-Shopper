import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { login } from 'APP/app/reducers/auth'

import Item from './Item'

/* -----------------    COMPONENT     ------------------ */
export class AllProducts extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {
          this.props.products && this.props.products.map(product => {
            console.log(product)
            return (<Item
              key={ product.id }
              id={ product.id }
              name={ product.name }
              price={ product.price }
              alt={ product.name }
              image={ product.images[0] }
            />
          )})
        }
    </div>
    )
  }
}

/* -----------------    CONTAINER    ------------------ */
const mapState = state => ({ products: state.product.products })
const mapDispatch = null

export default connect( mapState, mapDispatch )( AllProducts )
