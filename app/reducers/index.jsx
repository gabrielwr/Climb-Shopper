import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  order: require('./order').default
})

export default rootReducer
