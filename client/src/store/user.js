import axios from 'axios'

// INITIAL STATE
const defaultUser = {}

// ACTION TYPES
const STORE_USER = 'STORE_USER'
const REMOVE_USER = 'REMOVE_USER'

// ACTION CREATORS
const storeUser = user => ({ type: STORE_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

// THUNK CREATORS
export const getUser = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(storeUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.post('/auth/login', {
      email,
      password
    })
    dispatch(storeUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const signup = (name, email, password) => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', {
      name,
      email,
      password
    })
    dispatch(storeUser(res.data))
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
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

export default userReducer
