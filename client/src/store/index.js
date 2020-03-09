import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

// REDUCERS
import user from './user'
import stocks from './stocks'
import transactions from './transactions'

const reducer = combineReducers({ user, stocks, transactions })
const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger({ collapsed: true }))
)

export default store
export * from './user'
export * from './stocks'
export * from './transactions'
