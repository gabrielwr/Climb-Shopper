import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

/* -----------------    STYLED COMPONENTS    ------------------ */
const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: ${ props => props.theme.text ? props.theme.text : 'black' };
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
`

const NavLink = styled(Link)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: black
  padding: 1rem;
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
  text-decoration: none;
`

const Anchor = styled.a`
  text-decoration: none;
  color: black;
`
/* -----------------    COMPONENT     ------------------ */
const SiteName = () => (
  <Div>
    <NavLink to="/">
      Climb Shopper
    </NavLink>
    <div>
      <small>
        &nbsp;styled with
        <Anchor href='https://www.styled-components.com/'> Styled-Components</Anchor>
      </small>
    </div>
  </Div>
)

export default SiteName;
