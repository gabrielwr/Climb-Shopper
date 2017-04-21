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
export default function(state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_CAMPUSES:
      newState.currentCampuses = action.campuses;
      break;

    case SET_SELECTED_CAMPUS:
      newState.selectedCampus = action.selectedCampus;
      break;

    case CREATE_CAMPUS:
      newState.currentCampuses = newState.currentCampuses.concat([action.campus]);
      break;

    case UPDATE_CAMPUS:
      newState.currentCampuses = newState.currentCampuses.map((campus) => (
        (campus.id === action.campus.id) ? action.campus : campus
      ))
      break;

    case DELETE_CAMPUS:
      newState.currentCampuses = newState.currentCampuses.filter((currentCampus) => (
        (currentCampus.id !== action.campusId && action.studentId !== 1)
      ))
      break;

    case ADD_STUDENT_TO_CAMPUS:
      newState.selectedCampus.students = newState.selectedCampus.students.concat([action.student])
      break;

    case REMOVE_STUDENT_FROM_CAMPUS:
      newState.selectedCampus.students =
        newState.selectedCampus.students.filter((student) => (student.id !== action.student.id))
      break;

    default:
      return state;

  }

  return newState;
}


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
