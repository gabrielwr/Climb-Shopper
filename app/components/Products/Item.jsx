
import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import formatPrice from 'APP/app/utils/priceFormatter'


const ProductLink = styled(Link)`
  display: flex;
  align-items: center;
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

const Article = styled.article`
  display: flex;
  width: 100%;
  color: ${ props => props.theme.text ? props.theme.text : 'black' };
  background-color: ${ props => props.theme.bg ? props.theme.bg : 'white' };
  padding: 1rem;
`

export default ({ productId, name, price, image, altText }) => {
  return (
    <ProductLink to={ `/products/${productId}` }>
      <Article style={{ backgroundImage: `url(${image})` }}>
        <div>
          <h3>{ name }</h3>
          <h3>{ formatPrice( price ) }</h3>
        </div>
      </Article>
    </ProductLink>
  )
}
