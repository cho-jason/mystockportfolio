import axios from 'axios'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
console.log('HISTORY', history)
// INITIAL STATE
const defaultUser = {}

// ACTION TYPES
const STORE_USER = 'STORE_USER'
const REMOVE_USER = 'REMOVE_USER'
const SUBTRACT_COST = 'SUBTRACT_COST'

// ACTION CREATORS
const storeUser = user => ({ type: STORE_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
export const subtractCost = cost => ({ type: SUBTRACT_COST, cost })

// THUNK CREATORS
export const getUser = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(storeUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const login = (email, password, push) => async dispatch => {
  try {
    const res = await axios.post('/auth/login', {
      email,
      password
    })
    dispatch(storeUser(res.data))
    push() // Used to push to a route
  } catch (err) {
    console.error(err)
  }
}

export const signup = (name, email, password, push) => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', {
      name,
      email,
      password
    })
    dispatch(storeUser(res.data))
    push() // Used to push to a route
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.delete('/auth/logout')
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case STORE_USER:
      return action.user
    case SUBTRACT_COST:
      return { ...state, balance: state.balance - action.cost }
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

export default userReducer
