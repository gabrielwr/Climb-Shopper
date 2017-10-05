import React from 'react'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import formatPrice from 'APP/app/utils/priceFormatter'


/* -----------------    STYLED COMPONENT     ------------------ */
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 4%;
  color: white;
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
  &:hover {
    background-color: grey;
  }
`

export default ({ handleClick, text, iconName }) => (
  <Div onClick={ handleClick }>
    <FontAwesome name={ iconName }/>
    <span>&nbsp;{ text }</span>
  </Div>
)
