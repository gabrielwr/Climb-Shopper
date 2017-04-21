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
const SET_PAST_ORDERS = 'SET_PAST_ORDERS'


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

export const setPastOrders = (orders) => ({
    type: SET_PAST_ORDERS,
    pastOrders: orders
  })
  /* ------------       REDUCERS     ------------------ */
export default function(state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {
    // case CREATE_ORDER:
    //   newState.currentOrder = action.currentOrder
    //   break

    case SET_CURRENT_ORDER:
      newState.currentOrder = action.currentOrder
      break

    case SET_PAST_ORDERS:
      newState.pastOrders = action.pastOrders
      break

    case UPDATE_PRODUCT_IN_ORDER:
      newState.currentOrder = newState.currentCampuses.concat([action.campus])
      break

    case ADD_PRODUCT_TO_ORDER:
      newState.currentCampuses = newState.currentCampuses.filter((currentCampus) => (
        (currentCampus.id !== action.campusId && action.studentId !== 1)
      ))
      break;
      //
      // case ADD_STUDENT_TO_CAMPUS:
      //   newState.selectedCampus.students = newState.selectedCampus.students.concat([action.student])
      //   break;
      //
      // case REMOVE_PRODUCT_FROM_ORDER:
      //   newState.selectedCampus.students =
      //     newState.selectedCampus.students.filter((student) => (student.id !== action.student.id))
      //   break;

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

export const fetchCurrentOrder = id => dispatch => {
  return axios.get(`/api/orders/${id}`)
    .then(res => dispatch(setCurrentOrder(res.data)))
    .catch(err => console.error(`Fetching current order unsuccesful`, err))

}

// export const findOrCreateCurrentOrder = () => dispatch => {
//   return axios.get(`/api/orders/`)
//     .then(res => )
//        .catch(err => console.error(`Removing user:  unsuccesful`, err))
// }

export const updateCurrentOrder = (id) => dispatch => {
  return axios.put('/api/orders')
    .then(res => dispatch(addProductToOrder(res.data)))
    .catch(err => console.error('Update failed', err))
}

// export const addProductToCurrentOrder = (id) => dispatch => {
//   return axios.put('/api/orders')
//     .then(res => )
// }
