import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getStocks } from '../store'

const Portfolio = ({ userId, stocks, getStocks }) => {
  // EFFECTS
  useEffect(() => {
    getStocks(userId)
  }, [])

  return (
    <div>
      <h2>Portfolio</h2>
      {stocks.map(stock => {
        return (
          <div key={stock.id}>
            {stock.symbol}: shares: {stock.shares} | price/share: $
            {stock.latestPrice / 100} | totalPrice: $
            {(stock.shares * stock.latestPrice) / 100} | Open Price: $
            {stock.open / 100}
          </div>
        )
      })}
    </div>
  )
}

const mapState = state => ({
  userId: state.user.id,
  stocks: state.stocks
})

const mapDispatch = dispatch => ({
  getStocks: userId => dispatch(getStocks(userId))
})

export default connect(mapState, mapDispatch)(Portfolio)
