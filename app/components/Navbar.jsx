import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import Login from './Login'
import WhoAmI from './WhoAmI'

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor( props ) {
    super( props )
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/" >Lisa's Bikes</Link>
          </li>
          <li>
            <Link to="/products" >Bicycles</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/authenticate" >Sign Up</Link>
          </li>
          <li>
            { this.props.user ? <WhoAmI/> : <Login/> }
          </li>
        </ul>
      </nav>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */
const mapProps = ({ auth }) => ({ user: auth })

const mapDispatch = null

export default connect( mapProps, mapDispatch )( Navbar )
