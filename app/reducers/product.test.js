import React from 'react'
import {expect, describe, it} from 'chai'
import {createStore} from 'redux'
import {shallow} from 'enzyme'

import rootReducer from 'APP/app/reducers/index'
import {setProduct, addProductToOrder} from './product'
import {AllProducts} from 'APP/app/components/AllProducts'

describe('Product actions', () => {
  const testProduct = {
    name: 'TheBike',
    category: 'Test',
    price: 1000,
    color: ['White', 'Red', 'Black'],
    size: ['Large', 'Medium', 'Small'],
    images: ['http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-org-2100.jpg'],
    quantity: 8,
    reviewStars: 4.5,
    description: 'This is a bike created only for this test'
  }
  describe('setProduct', () => {
    it('returns properly formatted action', () => {
      expect(setProduct(testProduct)).to.be.deep.equal({
        type: 'SET_SELECTED_PRODUCT',
        selectedProduct: testProduct
      })
    })
  })

  describe('addProductToOrder', () => {
    it('returns properly formatted action', () => {
      expect(addProductToOrder(testProduct)).to.be.deep.equal({
        type: 'ADD_PRODUCT_TO_ORDER',
        product: testProduct
      })
    })
  })
})

describe('Product reducer', () => {
  const testProduct = {
    name: 'TheBike',
    category: 'Test',
    price: 1000,
    color: ['White', 'Red', 'Black'],
    size: ['Large', 'Medium', 'Small'],
    images: ['http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-org-2100.jpg'],
    quantity: 8,
    reviewStars: 4.5,
    description: 'This is a bike created only for this test'
  }
  let testStore
  beforeEach('Create testing store', () => {
    testStore = createStore(rootReducer)
  })

  it('has expected initial state', () => {
    expect(testStore.getState().product).to.be.deep.equal(
      {
        products: [],
        selectedProduct: {}
      }
        )
  })

  describe('SET_SELECTED_PRODUCT', () => {
    it('sets selectedProduct to action selectedProduct', () => {
      testStore.dispatch({ type: 'SET_SELECTED_PRODUCT', selectedProduct: testProduct })
      const newState = testStore.getState()
      expect(newState.product.selectedProduct).to.be.deep.equal(testProduct)
    })
  })
})

describe('AllProducts Component', () => {
  const products = [
    {
      id: 1,
      name: 'RoadMaster X-Treme',
      category: 'Road',
      price: 135900,
      images: [
        'http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-org-2100.jpg',
        'http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-wht-2100.jpg',
        'http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-blk-2100.jpg'
      ],
      color: [
        'White',
        'Red',
        'Black'
      ],
      size: [
        'Large',
        'Medium',
        'Small'
      ],
      quantity: 7480,
      reviewStars: '3.9',
      description: 'SO EXTREME YOUR FACE WILL MELT! us vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in',
      created_at: '2017-04-24T18:13:57.174Z',
      updated_at: '2017-04-24T18:13:57.174Z'
    },
    {
      id: 2,
      name: 'Mount-Pain X-FIRE',
      category: 'Mountain',
      price: 210051,
      images: [
        'http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-org-2100.jpg',
        'http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-wht-2100.jpg'
      ],
      color: [
        'White',
        'Red',
        'Pink'
      ],
      size: [
        'Large',
        'Medium',
        'Small'
      ],
      quantity: 2403,
      reviewStars: '3.9',
      description: 'SUCH PAIN AHHH! us vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in',
      created_at: '2017-04-24T18:13:57.174Z',
      updated_at: '2017-04-24T18:13:57.174Z'
    },
    {
      id: 3,
      name: 'Mount-Pain X-FIRE',
      category: 'Mountain',
      price: 210052,
      images: [
        'http://www.bikesdirect.com/products/gravity/images/avenue-a-xiv-blk-2100.jpg'
      ],
      color: [
        'Red',
        'Blue'
      ],
      size: [
        'Large',
        'Medium',
        'Small'
      ],
      quantity: 2403,
      reviewStars: '3.2',
      description: 'SUCH PAIN AHHH! MEDIUM IS ON THE SMALL SIDE OF THINGS! us vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in',
      created_at: '2017-04-24T18:13:57.175Z',
      updated_at: '2017-04-24T18:13:57.175Z'
    }
  ]
  const allproducts = shallow(<AllProducts products={products}/>)

  it('should be a <div> ', () => {
    expect(allproducts.is('div')).to.be.equal(true)
  })
})
