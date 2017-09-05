import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import styled from 'styled-components'

//Components
import Login from '../Authentication/Login'
import WhoAmI from '../Authentication/WhoAmI'
import Item from '../Products/Item'
import CheckoutButton from './CheckoutButton'

//Reducers
import { deleteItemFromDatabase } from 'APP/app/reducers/order'

const HeaderCell = styled.th`
  padding: 1rem;
  margin: 1rem;
  border-style: solid;
  border-color: lightgrey;
`

const Cell = styled.td`
  padding: 1rem;
  margin: 1rem;
  border-size: 1em;
  border-style: solid;
  border-color: lightgrey;
`

const TFRow = styled.tr`
  padding-top: 500px;
  border-size: 1em;
  border-style: solid;
  border-top-color: lightgrey;
`


/* -----------------    COMPONENT     ------------------ */
export class Cart extends React.Component {

  constructor(props) {
    super(props)
  }

  calculateTotal() {
    return this.props.currentOrder.items &&
      this.props.currentOrder.items.reduce(
        (total, item) => (total + item.price * item.quantity), 0)
        / 100
  }

  render() {
    console.log('props check cart', this.props)
    return (
      <div>
        <table>
          <thead>
            <tr >
              <HeaderCell>
                Product Name
              </HeaderCell>
              <HeaderCell>
                Quantity
              </HeaderCell>
              <HeaderCell>
                Price
              </HeaderCell>
              <HeaderCell>
                Remove
              </HeaderCell>
            </tr>
          </thead>
          <tbody>
            {
              this.props.currentOrder.items &&
              this.props.currentOrder.items.map( item =>
                (
                  <Cell
                    key={ item.id }
                  >
                    <Item
                      item={ item }
                      handleRemove={ this.props.handleRemove }
                    />
                  </Cell>
                )
              )
            }
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td>${this.calculateTotal()}</td>
            </tr>
          </tfoot>
        </table>
        <CheckoutButton
          handleClick={ null }
          text='Checkout!'
          iconName='money'
        />
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ auth, order }) => ({ user: auth, currentOrder: order.currentOrder })

const mapDispatch = dispatch => ({ handleRemove: itemId => {
  dispatch(deleteItemFromDatabase(itemId))
}})

export default connect(mapProps, mapDispatch)(Cart)
