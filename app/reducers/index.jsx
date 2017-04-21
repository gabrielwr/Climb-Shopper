import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  product: require('./product').default,
  review: require('./review').default,
})

export default rootReducer
