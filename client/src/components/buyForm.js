import React, { useState } from 'react'
import { connect } from 'react-redux'
import { purchaseStock } from '../store'

const BuyForm = ({ user, purchaseStock }) => {
  // STATE
  const [symbol, setSymbol] = useState('')
  const [shares, setShares] = useState(0)

  const handleSubmit = evt => {
    evt.preventDefault()
    if (shares > 0 && shares % 1 === 0) {
      purchaseStock(symbol.toUpperCase(), parseInt(shares), user.id)
    }
  }

  return (
    <div id="buy">
      <h2>Buy Stock</h2>
      <p>
        <strong>Available Balance:</strong> ${user.balance / 100}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="symbol">Ticker Symbol</label>
          <input
            name="symbol"
            type="text"
            value={symbol}
            onChange={evt => setSymbol(evt.target.value)}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="shares">Shares</label>
          <input
            name="shares"
            type="number"
            value={shares}
            onChange={evt => setShares(evt.target.value)}
            required
          />
        </div>
        <button type="submit">Buy</button>
      </form>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  purchaseStock: (symbol, shares, userId) => {
    dispatch(purchaseStock(symbol, shares, userId))
  }
})

export default connect(mapState, mapDispatch)(BuyForm)
