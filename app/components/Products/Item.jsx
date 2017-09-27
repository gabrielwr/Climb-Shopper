
import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import formatPrice from 'APP/app/utils/priceFormatter'


const ProductLink = styled(Link)`
  display: flex;
  align-items: center;
  border-size: 1px;
  border-style: solid;
  border-color: black;
  color: black;
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
const Div = styled.div`
  min-height: 75%;
  min-width: 75%
`

const Img = styled.img`
  min-height: 75%;
  min-width: 100%;
`

export default ({ productId, name, price, image, altText }) => {
  return (
    <ProductLink to={ `/products/${productId}` }>
      <Article >
        <Div>
          <Img style={{ backgroundImage: `url(${image})` }} />
        </Div>
        <div>
          <h3>{ name }</h3>
          <h3>{ formatPrice( price ) }</h3>
        </div>
      </Article>
    </ProductLink>
  )
}
