import axios from 'axios'
import { asyncForEach } from '../util'

// INITIAL STATE
const defaultStocks = []

// ACTION TYPES
const STORE_STOCKS = 'STORE_STOCKS'
const ADD_STOCK = 'ADD_STOCK'

// ACTION CREATORS
const storeStocks = stocks => ({
  type: STORE_STOCKS,
  stocks
})

export const addStock = stock => ({
  type: ADD_STOCK,
  stock
})

// THUNK CREATORS
export const getStocks = userId => async dispatch => {
  try {
    let res = await axios.get(`/api/users/${userId}/stocks`)
    const stocks = res.data
    // Update each stock with open and latestPrice
    await asyncForEach(stocks, async (stock, idx) => {
      res = await axios.get(`/api/stocks/${stock.symbol}`)
      stocks[idx].change = res.data.change
      stocks[idx].latestPrice = Math.round(res.data.latestPrice * 100)
    })
    dispatch(storeStocks(stocks))
  } catch (err) {
    console.error(err)
  }
}

export const updateStocks = outdatedStocks => async dispatch => {
  try {
    const updatedStocks = []
    await asyncForEach(outdatedStocks, async stock => {
      const res = await axios.get(`/api/stocks/${stock.symbol}`)
      updatedStocks.push({
        ...stock,
        open: Math.round(res.data.open * 100),
        latestPrice: Math.round(res.data.latestPrice * 100)
      })
    })
    dispatch(storeStocks(updatedStocks))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
const stocksReducer = (state = defaultStocks, action) => {
  switch (action.type) {
    case STORE_STOCKS:
      return action.stocks
    case ADD_STOCK:
      let newStock = true
      let stocks = state.map(stock => {
        // Update number of shares if stock is in portfolio
        if (stock.symbol === action.stock.symbol) {
          newStock = false
          let shares = stock.shares + action.stock.shares
          return { ...stock, shares, change: action.stock.change }
          // Otherwise just return stock
        } else {
          return stock
        }
      })
      //Add stock to portfolio if stock is new
      if (newStock) {
        stocks.push(action.stock)
      }
      return stocks
    default:
      return state
  }
}

export default stocksReducer
