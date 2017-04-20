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

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products: products
})

export const setProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  selectedProduct: product
})

export const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  product: product
})

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product: product
})

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId: productId
})

export const addProductToOrder = (product) => ({
  type: ADD_PRODUCT_TO_ORDER,
  product: product
})

export const removeProductFromOrder = (product) => ({
  type: REMOVE_PRODUCT_FROM_ORDER,
  product: product
})

export const updateProductInOrder = (product) => ({
  type: UPDATE_PRODUCT_IN_ORDER,
  product: product
})
  /* ------------       REDUCERS     ------------------ */

/* ------------       DISPATCHERS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
    .then(res => dispatch(init(res.data)));
};

export const removeUser = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/users/`)
    .catch(err => console.error(`Removing user:  unsuccesful`, err));
};
