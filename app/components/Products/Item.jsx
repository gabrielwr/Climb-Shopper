import React from 'react'

/* -----------------    COMPONENT     ------------------ */
const Item = props => (
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
        <button className="btn btn-warning btn-xs" onClick={() => props.handleRemove( props.item.id )}>
          <i className='glyphicon glyphicon-remove' style={{ color: 'red' }}></i>
        </button>
      </div>
    </td>
  </tr>
)

export default Item
