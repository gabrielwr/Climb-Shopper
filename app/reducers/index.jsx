import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  product: require('./product').default,
  review: require('./review').default,
  order: require('./review').default,
  user: require('./user').default,
  account: require('./account').default
})

export default rootReducer
