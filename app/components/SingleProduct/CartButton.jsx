import React from 'react'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
import formatPrice from 'APP/app/utils/priceFormatter'

export default ({ handleClick, text, iconName }) => (
  <div onClick={ handleClick }>
    <FontAwesome name={ iconName }/>
    <span>{ text }</span>
  </div>
)
