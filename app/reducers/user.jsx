import axios from 'axios'

const initialState = {
  users: [],
  selectedUser: {}
}

/* -----------------    ACTION TYPES     ------------------ */
const SET_USERS = 'SET_USERS'
const SET_SELECTED_USERS = 'SET_SELECTED_USERS'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'
const CREATE_USER = 'CREATE_USER'
const ADD_ORDER_TO_USER = 'ADD_ORDER_TO_USER'
  // Below might not be needed
  // I am leaving here till we have the order reducer built out.
const UPDATE_ORDER_IN_USER = 'UPDATE_ORDER_IN_USER'
const REMOVE_ORDER_FROM_USER = 'REMOVE_ORDER_FROM_USER'

/* ------------   ACTION CREATORS     ------------------ */

export const setUsers = (users) => ({
  type: SET_USERS,
  users: users
})

export const setSelectedUser = (user) => ({
  type: SET_SELECTED_USER,
  selectedUser: user
})

export const createUser = (user) => ({
  type: CREATE_USER,
  user: user
})

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user: user
})

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId: userId
})

export const addUserToOrder = (user) => ({
  type: ADD_ORDER_TO_USER,
  user: user
})

export const removeOrderFromUser = (order) => ({
  type: REMOVE_ORDER_FROM_USER,
  order: order
})

export const updateOrderInUser = (order) => ({
  type: UPDATE_ORDER_IN_USER,
  order: order
})


/* ------------       REDUCERS     ------------------ */
export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case SET_USERS:
      newState.users = action.users
      break

    case SET_SELECTED_USERS:
      newState.selectedUser = action.selectedUser
      break

    case CREATE_USER:
      newState.users = newState.users.concat([action.users])
      break

    case UPDATE_USER:
      newState.users = newState.users.map((user) => (
        (user.id === action.user.id) ? action.user : user
      ))
      break

    case DELETE_USER:
      newState.users = newState.users.filter((currentUser) => (
        (currentUser.id !== action.userId)
      ))
      break

    case ADD_ORDER_TO_USER:
      newState.selectedUser.students = newState.selectedUser.students.concat([action.student])
      break

    case REMOVE_ORDER_FROM_USER:
      newState.selectedUser.students =
        newState.selectedUser.students.filter((student) => (student.id !== action.student.id))
      break

    case UPDATE_ORDER_IN_USER:
      newState.selectedUser.students =
        newState.selectedUser.students.filter((student) => (student.id !== action.student.id))
      break

    default:
      return state
  }

  return newState
}
/* ------------       DISPATCHERS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
    .then(res => dispatch(setUsers(res.data)))
}

export const removeUser = id => dispatch => {
  dispatch(deleteUser(id))
  axios.delete(`/api/users/:id`) // <= OB/LP need ${id} instead of :id
    .catch(err => console.error(`Removing user:  unsuccesful`, err))
  }
}
