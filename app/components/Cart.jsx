import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import Login from './Login'
import WhoAmI from './WhoAmI'

  /* -----------------    COMPONENT     ------------------ */

class Cart extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        I am your cart!
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ auth }) => ({ user: auth });

const mapDispatch = null

export default connect(mapProps, mapDispatch)(Cart);
