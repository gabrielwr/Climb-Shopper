import axios from 'axios'

const initialState = {
  products: [],
  selectedProduct: {}
}

/* -----------------    ACTION TYPES     ------------------ */
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const ADD_PRODUCT_TO_ORDER = 'ADD_PRODUCT_TO_ORDER'
const UPDATE_PRODUCT_IN_ORDER = 'UPDATE_PRODUCT_IN_ORDER'
const REMOVE_PRODUCT_FROM_ORDER = 'REMOVE_PRODUCT_FROM_ORDER'

/* ------------   ACTION CREATORS     ------------------ */

export const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const setProduct = product => ({
  type: SET_SELECTED_PRODUCT,
  selectedProduct: product
})

export const createProduct = product => ({
  type: CREATE_PRODUCT,
  product
})

export const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})

export const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
})

export const addProductToOrder = product => ({
  type: ADD_PRODUCT_TO_ORDER,
  product
})

export const removeProductFromOrder = product => ({
  type: REMOVE_PRODUCT_FROM_ORDER,
  product
})

export const updateProductInOrder = product => ({
  type: UPDATE_PRODUCT_IN_ORDER,
  product
})

/* ------------       REDUCERS     ------------------ */
export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch ( action.type ) {
    case SET_PRODUCTS:
      newState.products = action.products
      break
    case SET_SELECTED_PRODUCT:
      newState.selectedProduct = action.selectedProduct
      break
    case CREATE_PRODUCT:
      newState.products = newState.products.concat([action.product])
      break
    case UPDATE_PRODUCT:
      newState.products = newState.products.map((product) => (
        (product.id === action.product.id) ? action.product : product
      ))
      break
    case DELETE_PRODUCT:
      newState.products = newState.products.filter((currentProduct) => (
        (currentProduct.id !== action.productId)
      ))
      break
    default:
      return state
  }

  return newState
}
/* ------------       DISPATCHERS     ------------------ */

export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => dispatch(setProducts(res.data)))
    .catch(err => console.error(`Fetching products:  unsuccessful`, err))
}

export const removeProduct = id => dispatch => {
  dispatch(deleteProduct(id))
  axios.delete(`/api/products/:id`)
    .catch(err => console.error(`Removing product:  unsuccessful`, err))
}

export const fetchSingleProduct = id => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => dispatch(setProduct(res.data)))
    .catch(err => console.error(`Fetching product failed..`, err))
}
