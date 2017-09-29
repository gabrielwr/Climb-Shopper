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

import CartItem from './CartItem'

const Table = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const THead = styled.thead`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TFoot = styled.tfoot`
  display: flex;
  justify-content: center;
  align-items: center;
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
    return (
      <div>
        <div>
          <Table>
            <THead>
              <tr >
                <CartItem type='th' content='Product Name' />
                <CartItem type='th' content='Quantity' />
                <CartItem type='th' content='Price' />
                <CartItem type='th' content='Remove' />
              </tr>
            </THead>
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
            <TFoot>
              <tr>
                <CartItem type='tf' content='' />
                <CartItem type='tf' content='' />
                <CartItem type='tf' content='' />
                <CartItem type='tf' content={`$${this.calculateTotal()}`} />
                <CartItem type='tf' content={
                  <CheckoutButton
                    handleClick={ null }
                    text='Checkout!'
                    iconName='money'
                  />
                } />
              </tr>
            </TFoot>
          </Table>
        </div>
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
