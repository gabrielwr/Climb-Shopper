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
const productReducer = rootReducer.product
import { SingleProduct } from './SingleProduct'

const product = {
  id: 1,
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

  describe('visual content', () => {

    it ('renders inside <div>', () => {
      expect(singleProduct.is('div')).to.be.equal(true)
    })
  })

  describe('update state according to user input', () => {

    it('has an initial local state with a singleProduct', () => {
      expect(singleProduct.state()).to.be.deep.equal({
        color: '',
        size: '',
        quantity: 0})
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

      const colorInput = singleProduct.find('#colorChange')
      colorInput.simulate('change', {target: {value: 'red', name: 'color'}})
      expect(singleProduct.state().color).to.be.equal('red')

    })
  })

  describe.only('action creators', () => {

    it('returns expected action description', () => {

      const actionDescriptor = productReducer.setProduct(product)
      console.log('!!!!!!!!actionDescriptor: ', actionDescriptor)

      expect(actionDescriptor).to.be.deep.equal({
        type: SET_SELECTED_PRODUCT,
        product: product
      })
    })

    it('returns expected action description', () => {
      const actionDescriptor = productReducer.addProductToOrder(product)

      expect(actionDescriptor).to.be.deep.equal({
        type: ADD_PRODUCT_TO_ORDER,
        product: product
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
})
