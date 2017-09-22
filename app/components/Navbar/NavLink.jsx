import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router'
import styled from 'styled-components'


/* -----------------    STYLED COMPONENT     ------------------ */
const NavLink = styled(Link)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background: ${ props => props.theme.primary ? props.theme.primary : 'white' };
  color: ${ props => props.theme.text ? props.theme.text : 'black' };
  padding-right: 3rem;
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
  text-decoration: none;
  &:hover {
    background-color: white;
    color: #15317e;
    text-decoration: underline;
  }
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
