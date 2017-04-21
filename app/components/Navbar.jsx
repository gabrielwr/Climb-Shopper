import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import Login from './Login'

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav style= {{backgroundColor: '#ADD8E6'}} >
      <div>This is the NavBar Fix Me Later</div>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/products" >Bicycles</Link>
        </li>
        <li>
          <Link to="/authenticate" >Sign Up</Link>
          {this.props.user ? <WhoAmI/> : <Login/>}
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>

      </nav>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ auth }) => ({ user: auth });

const mapDispatch = null

export default connect(mapProps, mapDispatch)(Navbar);
