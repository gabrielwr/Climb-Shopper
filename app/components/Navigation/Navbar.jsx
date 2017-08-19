import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import styled from 'styled-components'


import Login from '../Authentication/Login'
import WhoAmI from '../Authentication/WhoAmI'


/* -----------------    STYLED COMPONENT     ------------------ */
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: ${ props => props.theme.primary ? props.theme.primary : '#15317e' };
  color: ${ props => props.theme.text ? props.theme.text : 'white' };
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    min-width: 200px;
    min-height: 100%;
  }
`

/* -----------------    COMPONENT     ------------------ */
class Navbar extends React.Component {
  constructor( props ) {
    super( props )
  }

  render() {
    return (
      <Nav >
        <ul>
          <a>
            <Link to="/" >Climb Shopper</Link>
          </a>
          <a>
            <Link to="/products" >Bicycles</Link>
          </a>
          <a>
            <Link to="/cart">Cart</Link>
          </a>
          <a>
            <Link to="/authenticate" >Sign Up</Link>
          </a>
          <a>
            { this.props.user ? <WhoAmI/> : <Login/> }
          </a>
        </ul>
      </Nav>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */
const mapState = ({ auth }) => ({ user: auth })
const mapDispatch = null

export default connect( mapState, mapDispatch )( Navbar )
