import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

/* -----------------    STYLED COMPONENT     ------------------ */
const Div = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: ${ props => props.theme.text ? props.theme.text : 'black' };
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };

`
/* -----------------    COMPONENT     ------------------ */
const UserIcon = () => (
  <Div>
    {/* user icon */}
  </Div>
)

export default UserIcon;
