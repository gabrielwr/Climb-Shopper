import axios from 'axios';

const initialState = {
    pastOrders: [],
    currentOrder: {}
  }


/* -----------------    ACTION TYPES     ------------------ */
const CREATE_ORDER = 'CREATE_ORDER'
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'
const ADD_PRODUCT_TO_ORDER = 'ADD_PRODUCT_TO_ORDER'
const UPDATE_PRODUCT_IN_ORDER = 'UPDATE_PRODUCT_IN_ORDER'
const REMOVE_PRODUCT_FROM_ORDER = 'REMOVE_PRODUCT_FROM_ORDER'
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const SET_PAST_ORDER = 'SET_PAST_ORDER'


/* ------------   ACTION CREATORS     ------------------ */

export const createOrder = (order) => ({
  type: CREATE_ORDER,
  currentOrder: order
})

export const setCurrentOrder = (order) => ({
  type: SET_CURRENT_ORDER,
  currentOrder: order
})

export const updateProductInOrder = (productId, price, quantity) => ({
  type: UPDATE_PRODUCT_IN_ORDER,
  productId: productId,
  price: price,
  quantity: quantity
})

export const addProductToOrder = (productId) => ({
  type: ADD_PRODUCT_TO_ORDER,
  productId: productId
})

export const removeProductFromOrder = (productId) => ({
  type: REMOVE_PRODUCT_FROM_ORDER,
  productId: productId
})

export const completeOrder = () => ({
  type: COMPLETE_ORDER,
})

export const setPastOrder = (orders) => ({
  type: SET_PAST_ORDER,
  pastOrders: orders
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
