import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { login } from 'APP/app/reducers/auth'

/* -----------------    COMPONENT     ------------------ */
export class AllProducts extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h5> here is all products </h5>
        <div className="row">
          {
            this.props.products && this.props.products.map(product => (
              <div className="col-xs-4" key={ product.id }>
                <Link className="thumbnail" to={`/products/${product.id}`}>
                  <img src={ product.images[0] }/>
                  <div className="caption">
                    <h5>
                      <span>{ product.name }</span>
                    </h5>
                    <h5>
                      <span>Price: ${ product.price/100 }</span>
                    </h5>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
    </div>
    )
  }
}

/* -----------------    CONTAINER    ------------------ */
const mapState = state => ({ products: state.product.products })
const mapDispatch = null

export default connect( mapState, mapDispatch )( AllProducts )
