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
  beforeEach('Create component and onChange spy', () => {
    singleProduct = shallow(<SingleProduct singleProduct={ product } />)
  })

  it ('has an initial local state with a singleProduct', () => {
    expect(singleProduct.state()).to.be.deep.equal({ product })
  })


  it ('update state when user chooses product color, size, quantity', () => {

    it ('"setColor" function updates color state when user clicks color selector', () => {
      expect(singleProduct.instance().setColor).to.be.function
      singleProduct.instance().setColor('blue')
      expect(singleProduct.state.color).to.be.deep.equal('blue')
    })

    it ('"setColor" function updates size state when user clicks size selector', () => {
      expect(singleProduct.instance().setSize).to.be.function
      singleProduct.instance().setSize('medium')
      expect(singleProduct.state.size).to.be.deep.equal('medium')
    })

    it ('"setColor" function updates color state when user clicks color selector', () => {
      expect(singleProduct.instance().setQuantity).to.be.function
      singleProduct.instance().setQuantity(1)
      expect(singleProduct.state.Quantity).to.be.deep.equal(1)
    })
  })
})
