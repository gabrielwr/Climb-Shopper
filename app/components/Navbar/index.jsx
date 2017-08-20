import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import styled from 'styled-components'

import Login from '../Authentication/Login'
import WhoAmI from '../Authentication/WhoAmI'

import SiteName from './SiteName'
import NavLink from './NavLink'
import UserIcon from './UserIcon'
import Nav from './StyledNavigation/StyledNav'
import Div from './StyledNavigation/StyledDiv'

/* -----------------    COMPONENT     ------------------ */
class Navbar extends React.Component {
  constructor( props ) {
    super( props )
  }

  render() {
    return (
      <Nav>
        <SiteName />
          <Div>
            <NavLink
              to='/products'
              name='Climbing Areas'
              logo='star-o'
            />
            <NavLink
              to='/cart'
              name='Cart'
              logo='shopping-cart'
            />
            <NavLink
              to='/authenticate'
              name='Sign Up/Login'
              logo='sign-in'
            />
            { this.props.user ? <UserIcon /> : null }
          </Div>
      </Nav>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */
const mapState = ({ auth }) => ({ user: auth })
const mapDispatch = null

export default connect( mapState, mapDispatch )( Navbar )
