import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'

/* -----------------    STYLED COMPONENT     ------------------ */
const NavLink = styled.a`
  display: flex;
  flex-wrap: nowrap;
  background: ${ props => props.theme.primary ? props.theme.primary : '#15317e' };
  color: ${ props => props.theme.text ? props.theme.text : 'white' };
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
`

/* -----------------    COMPONENT     ------------------ */
export default ({ to, name, logo, onClick }) => (
  <Link
    to={ to }
    name={ name }
    onClick={ onClick }
  >
    { logo && <FontAwesome name={ logo } /> }
    &nbsp;{ name }
  </Link>
)
