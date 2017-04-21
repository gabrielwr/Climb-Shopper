import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  order: require('./order').default,
  product: require('./product').default,
  review: require('./review').default,
})

export default rootReducer
