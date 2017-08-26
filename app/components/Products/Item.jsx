
import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import formatPrice from 'APP/app/utils/priceFormatter'


const ProductLink = styled(Link)`
  display: flex;
  align-items: center;
  background: ${ props => props.theme.primary ? props.theme.primary : '#15317e' };
  color: ${ props => props.theme.text ? props.theme.text : 'white' };
  padding: 1rem;
  min-height: ${ props => props.theme.height ? props.theme.height + 'px' : '50px' };
  text-decoration: none;
`

export default ({ productId, name, price, image, description, alt }) => (
  <ProductLink to={`/products/${productId}`}>
    <article>
      <div>
        <img style={{backgroundImage: `url(${image})`}} />
      </div>
      <div>
        <h3>{ name }</h3>
        <h3>{ formatPrice( price ) }</h3>
      </div>
    </article>
  </ProductLink>
)
