import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import styled from 'styled-components'

import Login from '../Authentication/Login'
import WhoAmI from '../Authentication/WhoAmI'

import SiteName from './SiteName'
import NavLink from './NavLink'
import UserIcon from './UserIcon'

/* -----------------    STYLED COMPONENTS     ------------------ */
const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  color: ${ props => props.theme.text ? props.theme.text : 'white' };
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };

  @media (max-width: 768px) {
    align-items: space-between;
  }
`

const Nav = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background-color: white;
  color: ${ props => props.theme.text ? props.theme.text : 'white' };
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '.5rem' };
  border-bottom: .1rem solid black;

  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      <Nav>
        <SiteName />
          <Div>
            <NavLink
              to='/products'
              logo='map-marker'
            />
            <NavLink
              to='/cart'
              logo='shopping-cart'
            />
            <NavLink
              to='/authenticate'
              logo='user-circle'
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
