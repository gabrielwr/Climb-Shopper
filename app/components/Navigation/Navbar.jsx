import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import styled from 'styled-components'

import Login from '../Authentication/Login'
import WhoAmI from '../Authentication/WhoAmI'

import SiteName from './SiteName'
import NavLink from './NavLink'


/* -----------------    STYLED COMPONENT     ------------------ */
const Nav = styled.nav`
  display: flex;
  flex-wrap: nowrap;

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
        <SiteName />
          <div>
            <NavLink
              to='/products'
              name='Climbing Areas'
              logo=''
            />
            <NavLink
              to='/cart'
              name='Cart'
              logo='shopping-cart'
            />
            <NavLink
              to='/authenticate'
              name='Sign Up'
              logo=''
            />
          </div>
        <a>
          { this.props.user ? <WhoAmI/> : <Login/> }
        </a>
      </Nav>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */
const mapState = ({ auth }) => ({ user: auth })
const mapDispatch = null

export default connect( mapState, mapDispatch )( Navbar )
