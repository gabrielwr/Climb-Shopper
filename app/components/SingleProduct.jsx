import React from 'react'
import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'
import store from 'App/app/store'

// *------------------- COMPONENT -----------------*//

class SingleProduct extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      color: '',
      size: '',
      quantity: 0
    }
    this.setColor = this.setColor.bind(this)
    this.setSize = this.setSize.bind(this)
    this.setQuantity = this.setQuantity.bind(this)
  }

  setColor(event){
    this.setState({ color: event.target.value })
  }

  setSize(event){

    this.setState({ size: event.target.value })
  }

  setQuantity(val){
    this.setState({ quantity: val})
  }

  render() {
    const product = this.props.singleProduct
    const reviews = this.props.reviews

          // /* move the input form /select form
          // *  render the images correctly
    //*         make add to cart work properly
          // * /
    return (
      <div>
        <div className = "col-md-6">
          {/*<div className="carousel carousel-slider">*/}
          {/*<a className="carousel-item">*/}
          {/*{*/}j
          {/*product.images && product.images.map(image => (*/}
          {/*<img src={ image }  />*/}
          {/*))*/}
          {/*}*/}
          {/*</a>*/}
          {/*</div>*/}
        </div>

        <div className="col-lg-6">
          <form>
            <h2 className="panel-title large-font">{ product.name }</h2>
            <p>Price: ${ product.price/100 }</p>
            <div className = "tb">{ product.description }</div>
            <a>Color</a>
            <select onChange = { this.setColor } >
              {
                product.color && product.color.map(color => (
                  <option  ><a >{ color }</a></option>
                ))
              }
            </select>

            <a className='dropdown-button btn' data-activates='dropdown1'>Size</a>
            <select onChange = { this.setSize }>
              {
                product.size && product.size.map(size => (
                  <option><a  >{ size }</a></option>
                ))
              }
            </select>

            <input onChange = {(e)=> this.setQuantity(e.target.value)}/>

            {/*<select>*/}
              {/*product.quantity && product.quantity(quantity => (*/}
                {/*<option><a onChange = {(e) => this.setQuantity(e.target.value)}>{quantity}</a></option>*/}
              {/*)*/}
            {/*</select>*/}
            <hr/>
            <button className = "btn btn-success"
                    disabled={ this.state.color === '' || this.state.size === '' || this.state.quantity === 0 } >
              ADD TO CART </button>
          </form>
        </div>

        <div className="col-md-6">
          <ul className= "list-group">
            {
              reviews && reviews.map(review => (
                <tr key = { review.id }>
                  <td> { review.title }</td>
                  <td> { review.num_stars }</td>
                  <td> { review.content }</td>
                </tr>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

/* ------------------- CONTAINER ----------------- */


export default connect(
  state => ({singleProduct: state.product.selectedProduct}),

  /**
   *   function onSubmitHandle is passed from main.jsx
   *  which is dispatching 'createOrder' reducer .
   *
   *   When user hits 'add to cart' button, onSubmitHandle will
   *  be triggered.
   *
   */
  // dispatch => ({ onSubmitHandle: this.props.onSubmitHandle })
)(SingleProduct)
