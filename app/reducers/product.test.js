import {expect} from 'chai'

import {setProduct, addProductToOrder} from './product'

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
