import React from 'react'
import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

/*------------------- COMPONENT -----------------*/

class SingleProduct extends React.Component (
  constructor(props) {
    super(props)
    // this.state = {
    //   story: {
    //     name: '',
    //     category: '',
    //     price: 0,
    //     images: [],
    //     color: '',
    //     size: '',
    //     quantity: 0,
    //     reviewStars:0.0,
    //     description: ''
    //   }
    }
  }

  render() {
    const story = this.state.story
    if (!story) return <div/>
    const
  }


  <div>
    <h2>{ this.props.selectedProduct.name }</h2>
    <h3>  </h3>
  </div>

)



/*------------------- CONTAINER -----------------*/

export default connect(
  state => ({singleProduct: state.selectedProduct}),
  {}
)(SingleProduct)
