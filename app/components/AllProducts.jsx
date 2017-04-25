import React from 'react'
import { Link } from 'react-router'
import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import Review from './Review'

export class AllProducts extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
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

export default connect(
  state => ({ products: state.product.products }),
  {}
)(AllProducts)
