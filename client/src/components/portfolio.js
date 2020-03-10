import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getStocks } from '../store'

const Portfolio = ({ userId, stocks, getStocks }) => {
  // EFFECTS
  useEffect(() => {
    getStocks(userId)
  }, [])

  return (
    <div id="portfolio">
      <h2>Portfolio</h2>
      {stocks.map(stock => {
        let stockStatus
        if (stock.change > 0) {
          stockStatus = 'increase'
        } else if (stock.change < 0) {
          stockStatus = 'decrease'
        } else {
          stockStatus = 'equal'
        }

        return (
          <div key={stock.symbol} className={stockStatus}>
            <p>
              <strong>{stock.symbol}</strong> - {stock.shares} share
              {stock.shares > 1 && 's'} @ $
              {(stock.latestPrice / 100).toFixed(2)} / share
            </p>
            <p>${((stock.shares * stock.latestPrice) / 100).toFixed(2)}</p>
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
