import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import styled from 'styled-components'


const HeaderCell = styled.th`
  padding: 1rem;
  margin: 1rem;
`

const Cell = styled.td`
  padding: 1rem;
  margin: 1rem;
  border-size: 1em;
`

const TFRow = styled.tr`

`

const Cart = ({ type, content }) => {
  if(type === 'th') {
    return <HeaderCell>{ content }</HeaderCell>
  } else if(type === 'tf') {
    return <TFRow>{ content }</TFRow>
  } else if(type === 'td') {
    return <Cell>{ content }</Cell>
  }
}

export default Cart
