import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import user from './user'

const reducer = combineReducers({ user })
const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger({ collapsed: true }))
)

export default store
export * from './user'
