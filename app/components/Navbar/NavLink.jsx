import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router'
import styled from 'styled-components'


/* -----------------    STYLED COMPONENT     ------------------ */
const NavLink = styled(Link)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background: ${ props => props.theme.primary ? props.theme.primary : '#15317e' };
  color: ${ props => props.theme.text ? props.theme.text : 'white' };
  padding: 1rem;
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
  text-decoration: none;
`

/* -----------------    COMPONENT     ------------------ */
export default ({ to, name, logo, onClick }) => (
  <NavLink
    to={ to }
    name={ name }
    onClick={ onClick }
  >
    { logo && <FontAwesome name={ logo } /> }
    &nbsp;{ name }
  </NavLink>
)
