import axios from 'axios'
import { addStock, subtractCost } from '.'

// INITIAL STATE
const defaultTransactions = { list: [], last: {} }

// ACTION TYPES
const STORE_TRANSACTIONS = 'STORE_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'
const STOP_TRANSACTION = 'STOP_TRANSACTION'

// ACTION CREATOR
const storeTransactions = transactions => ({
  type: STORE_TRANSACTIONS,
  transactions
})

export const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  transaction
})

export const stopTransaction = error => ({
  type: STOP_TRANSACTION,
  error
})

// THUNK CREATORS
export const getTransactions = userId => async dispatch => {
  try {
    const res = await axios.get(`api/users/${userId}/transactions`)
    dispatch(storeTransactions(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const purchaseStock = (symbol, shares, userId) => async dispatch => {
  try {
    let res = await axios.post(`api/transactions`, {
      symbol,
      shares,
      userId
    })
    const totalCost = res.data.pricePerShare * shares
    dispatch(addTransaction(res.data))
    res = await axios.get(`api/stocks/${symbol}`)
    const stock = {
      symbol,
      shares,
      change: res.data.change,
      latestPrice: res.data.latestPrice
    }
    dispatch(addStock(stock))
    dispatch(subtractCost(totalCost))
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 404) {
      dispatch(stopTransaction({ errorMessage: err.response.data }))
    }
    console.error(err)
  }
}

// REDUCER
const transactionReducer = (state = defaultTransactions, action) => {
  switch (action.type) {
    case STORE_TRANSACTIONS:
      return { ...state, list: action.transactions }
    case ADD_TRANSACTION:
      return {
        ...state,
        list: [...state.list, action.transaction],
        last: action.transaction
      }
    case STOP_TRANSACTION:
      return { ...state, last: action.error }
    default:
      return state
  }
}

export default transactionReducer
