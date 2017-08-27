
import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import formatPrice from 'APP/app/utils/priceFormatter'


const ProductLink = styled(Link)`
  display: flex;
  align-items: center;
  border-size: 1em;
  border-style: solid;
  border-color: lightgrey;
  color: ${ props => props.theme.text ? props.theme.text : 'black' };
  padding: 1rem;
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
  text-decoration: none;
  &:hover {
    background-color: lightgrey;
  }
`

export default ({ productId, name, price, image, description, alt }) => {
  return (<ProductLink to={`/products/${productId}`}>
    <article>
      <div>
        <img style={{ backgroundImage: `url(${image})` }} />
      </div>
      <div>
        <h3>{ name }</h3>
        <h3>{ formatPrice( price ) }</h3>
      </div>
    </article>
  </ProductLink>)
}
