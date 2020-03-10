import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getStocks } from '../store'

const Portfolio = ({ userId, stocks, getStocks }) => {
  // EFFECTS
  useEffect(() => {
    getStocks(userId)
  }, [getStocks, userId])

  return (
    <div id="portfolio">
      <h2>Portfolio</h2>
      {stocks.map(stock => {
        let stockStatus
        let stockArrow
        if (stock.change > 0) {
          stockStatus = 'increase'
          stockArrow = '\u2191'
        } else if (stock.change < 0) {
          stockStatus = 'decrease'
          stockArrow = '\u2193'
        } else {
          stockStatus = 'equal'
          stockArrow = '-'
        }

        return (
          <div key={stock.symbol} className={stockStatus}>
            <div>
              <p>
                <strong>{stock.symbol}</strong> - {stock.shares} share
                {stock.shares > 1 && 's'}
              </p>
              <small className="stock-info">
                ${(stock.latestPrice / 100).toFixed(2)} / share (
                {stock.change.toFixed(2)} <strong>{stockArrow}</strong>)
              </small>
            </div>
            <p>
              <strong>Total Value:</strong> $
              {((stock.shares * stock.latestPrice) / 100).toFixed(2)}
            </p>
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
