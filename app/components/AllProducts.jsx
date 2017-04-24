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

            <tr>
              <td>
                <Link to = {`/products/${product.id}`}>
                  <img src={ product.images[0] } style={{height:'35px'}}/>
                </Link>
              </td>
              <td>
                <Link to = {`/products/${product.id}`}>
                  <div className="text-center">{ product.name }</div>
                </Link>
              </td>
              <td>
                <div className="text-center" >${ product.price/100 }</div>
              </td>
              <td>
                <div className="text-center">{ product.reviewStars }</div>
              </td>
            </tr>
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
