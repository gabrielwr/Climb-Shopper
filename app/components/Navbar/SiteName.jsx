import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

/* -----------------    STYLED COMPONENTS    ------------------ */
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: black;
  padding-left: 2rem;
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
  text-decoration: none;
  &:hover {
    color: lightblue;
  }
`

/* -----------------    COMPONENT     ------------------ */
const SiteName = () => (
  <NavLink to="/">
    Climb Shopper
  </NavLink>
)

export default SiteName;
