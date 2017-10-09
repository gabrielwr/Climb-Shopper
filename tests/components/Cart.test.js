import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Cart } from 'APP/app/components/Cart/Cart'
import Item from 'APP/app/components/Products/Item'

describe.only('<Cart />', () => {

  describe('visual content', function() {

    let currentOrder, orderItem, orderWrapper
    beforeEach('Create <Message /> wrapper', () => {
      currentOrder = {
        id: 1,
        status: 'Pending',
        user_id: 2,
        items: [{
          id: 3,
          price: 160051,
          quantity: 1,
          order_id: 1,
          product_id: 3,
          product: {
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
          }
        }]
      }
      orderItem = {
        id: 3,
        price: 160051,
        quantity: 1,
        order_id: 1,
        product_id: 3,
        product: {
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
        }
      }
      orderWrapper = shallow(<Cart currentOrder={currentOrder}/>)
    })

    it('renders table head with five ths', () => {
      const headers = orderWrapper.find('th')
      expect(headers).to.have.length(5)
    })

    it('renders an <Item /> Element', () => {
      expect(orderWrapper.containsMatchingElement(<Item item={ orderItem }/>)).to.equal(true)
    })

  })
  describe('interactivity', function() {

  })

})
