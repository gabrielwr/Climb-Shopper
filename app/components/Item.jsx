import React from 'react'

export default (props) => (
  <tr>
    <td>
      <img src={props.item.product.images[0]} style={{height:'35px'}}/>
    </td>
    <td>
      <div className="text-center">{props.item.product.name}</div>
    </td>
    <td>
      <div className="text-center">{props.item.quantity}</div>
    </td>
    <td>
      <div className="text-center" >${props.item.price/100}</div>
    </td>
    <td>
      <div className='text-center'>
      <i className='glyphicon glyphicon-remove' style={{color:'red'}}>
      </i>
      </div>
    </td>
  </tr>
)
