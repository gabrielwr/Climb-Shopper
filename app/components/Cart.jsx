import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import Login from './Login'
import WhoAmI from './WhoAmI'
import Item from './Item'
import { deleteItemFromDatabase } from '../reducers/order'

/* -----------------    COMPONENT     ------------------ */

export class Cart extends React.Component {

  constructor(props) {
    super(props)
  }

  calculateTotal() {
    return this.props.currentOrder.items &&
      this.props.currentOrder.items.reduce((total, item) => (total + item.price * item.quantity), 0) / 100
  }

  render() {
    return (
      <div className="container">
      <div className="row clearfix">
        <div className="col-md-12 column">
          <table className="table  table-hover" id="tab_logic">
            <thead>
              <tr >
                <th className="text-center">
                </th>
                <th className="text-center">
                  Product Name
                </th>
                <th className="text-center">
                  Quantity
                </th>
                <th className="text-center">
                  Price
                </th>
                <th className="text-center">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.currentOrder.items && this.props.currentOrder.items.map((item) =>(<Item key={item.id} item={item} handleRemove={ this.props.handleRemove } />))}
            </tbody>
            <tfoot>
              <tr>
                <td />
                <td />
                <td />
                <td className='text-center'> ${this.calculateTotal()}</td>
                <td className='text-center'>
                  <a id='checkout' className="btn btn-default">Checkout</a>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
     </div>
    </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ auth, order }) => ({ user: auth, currentOrder: order.currentOrder })

const mapDispatch = (dispatch) => ({ handleRemove: (itemId) => {
  dispatch(deleteItemFromDatabase(itemId))
}})

export default connect(mapProps, mapDispatch)(Cart)
