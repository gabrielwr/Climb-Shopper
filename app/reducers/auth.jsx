import axios from 'axios'

const initialState = {
  authenticatedUser: {}
}

/* -----------------    ACTION TYPES     ------------------ */
const AUTHENTICATED = 'AUTHENTICATED'

/* ------------   ACTION CREATORS     ------------------ */
export const authenticated = user => ({
  type: AUTHENTICATED,
  user
})

/* ------------       REDUCER     ------------------ */
const reducer = ( state = initialState, action ) => {
  const newState = Object.assign( {}, state )
  switch ( action.type ) {
    case AUTHENTICATED:
      newState.authenticatedUser = action.user
      break
    default:
      return state
  }
  return newState
}

/* ------------       DISPATCHERS     ------------------ */
export const login = ( username, password ) =>
  dispatch =>
    axios.post('/api/auth/login/local', { username, password })
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated( user ))
      })
      .catch(failed => dispatch(authenticated(null)))

/* ------------       EXPORTS     ------------------ */
export default reducer
