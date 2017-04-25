import React from 'react'
import { createStore } from 'redux'
import { range, last } from 'lodash'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

import rootReducer from 'APP/app/reducers/index'
import SingleProduct from './SingleProduct'

const product = {
  name: 'RoadMaster X-Treme',
  category: 'Road',
  price: 135900,
  color: ['White', 'Red', 'Black'],
  size: ['Large', 'Medium', 'Small'],
  images: ['http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-org-2100.jpg', 'http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-wht-2100.jpg', 'http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-blk-2100.jpg'],
  quantity: 7480,
  reviewStars: 3.9,
  description: 'SO EXTREME YOUR FACE WILL MELT! us vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in'
}

describe('Single product react test', () => {

  let singleProduct
  beforeEach('Create component', () => {
    singleProduct = shallow(<SingleProduct singleProduct={ product }/>)
  })

  // describe('visual content', () => {
  //   it('includes "name" line as an h2', () => {
  //     expect(singleProduct.find('h2').to.have.html('<h2 className="panel-title large-font">{ product.name }</h2>'))
  //   })
  //
  //   it('includes "price" line as an p', () => {
  //     expect(singleProduct.find('p').to.have.html('<p>Price: $ { product.price/100 }</p>'))
  //   })
})

describe('update state according to user input', () => {
  let singleProduct
  beforeEach('Create component', () => {
    singleProduct = shallow(<SingleProduct singleProduct={ product }/>)
  })

  it('has an initial local state with a singleProduct', () => {
    expect(singleProduct.state()).to.be.deep.equal({product})
  })

  it('has a function that handles user input', () => {
    expect(singleProduct.instance().handleInputChange).to.be.function
  })

  it('sets local state when inputs change', () => {

    expect(singleProduct.state()).to.be.deep.equal({
      color: '',
      size: '',
      quantity: 0
    })

    const colorInput = singleProduct.find('#')
    colorInput.simulate('change', {target: {value: 'red', name: 'color'}})
    expect(singleProduct.state().color).to.be.equal('red');

    const sizeInput = singleProduct.find('#subject-field')
    sizeInput.simulate('change', {target: {value: 'medium', name: 'size'}})
    expect(singleProduct.state().size).to.be.equal('medium?')

    const quantityInput = singleProduct.find('#quantity-field')
    quantityInput.simulate('change', {target: {value: 1, name: 'quantity'}})
    expect(singleProduct.state().quantity).to.be.equal(1)

  })
})

describe('Redux architecture', () => {

  describe('action creators', () => {

    it('returns expected action description', () => {

      const actionDescriptor = setProduct(product)

      expect(actionDescriptor).to.be.deep.equal({
        type: SET_SELECTED_PRODUCT,
        product: product
      })
    })

    it('returns expected action description', () => {
      const actionDescriptor = addProductToOrder(product)

      expect(actionDescriptor).to.be.deep.equal({
        type: ADD_PRODUCT_TO_ORDER,
        product: product
      })
    })
  })
})

describe('store/reducer', () => {
  let testingStore
  beforeEach('Create testing store from reducer', () => {
    testingStore = createStore(rootReducer)
  })

  it('has an initial state as described', () => {
    const currentStoreState = testingStore.getState()
    expect(currentStoreState.selectedProduct).to.be.deep.equal({})
  })
})
