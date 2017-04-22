import axios from 'axios';

const initialState = {
  pastOrders: [],
  currentOrder: {}
}


/* -----------------    ACTION TYPES     ------------------ */
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'
const SET_PAST_ORDERS = 'SET_PAST_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'

/* ------------   ACTION CREATORS     ------------------ */

export const setCurrentOrder = (order) => ({
  type: SET_CURRENT_ORDER,
  order: order
})

export const setPastOrders = (orders) => ({
  type: SET_PAST_ORDERS,
  pastOrders: orders
})

export const updateOrder = (order) => ({
  type: UPDATE_ORDER,
  order: order
})

/* ------------       REDUCERS     ------------------ */
export default function(state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case SET_CURRENT_ORDER:
      newState.currentOrder = action.order
      break
    case SET_PAST_ORDERS:
      newState.pastOrders = action.pastOrders
      break
    case UPDATE_ORDER:
      newState.currentOrder = action.order
      break
    default:
      return state
  }
  return newState
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchPastOrders = () => dispatch => {
  return axios.get('/api/orders')
    .then(res => dispatch(setPastOrders(res.data)))
    .catch(err => console.error(`Fetching past orders unsuccesful`, err))
}

export const fetchSessionOrder = () => dispatch => {
  return axios.get('/api/orders/new')
    .then(res => dispatch(setCurrentOrder(res.data)))
    .catch(err => console.error(`Fetching new order unsuccesful`, err))
}

export const updateCurrentOrder = (id, order) => dispatch => {
  return axios.put(`/api/stories/${id}`, order)
    .then(res => dispatch(updateOrder(res.data)))
    .catch(err => console.error(`Updating order #${id} unsuccessful`, err))
}
