import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getTransactions } from '../store'
import { getDate } from '../util'

const Transactions = ({ userId, transactions, getTransactions }) => {
  // EFFECTS
  useEffect(() => {
    getTransactions(userId)
  }, [])

  return (
    <div id="transactions">
      <h2>Transactions</h2>
      {transactions.map(transaction => {
        const { id, stockSymbol, shares, pricePerShare } = transaction

        const date = getDate(new Date(transaction.date))

        return (
          <div key={id}>
            <small>{date}</small>
            <div className="transaction">
              <p>
                <strong>{stockSymbol}</strong> - {shares} shares @ $
                {(pricePerShare / 100).toFixed(2)} / share
              </p>
              <p>
                <strong>Total:</strong> $
                {((shares * pricePerShare) / 100).toFixed(2)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapState = state => ({
  userId: state.user.id,
  transactions: state.transactions.list
})

const mapDispatch = dispatch => ({
  getTransactions: userId => dispatch(getTransactions(userId))
})

export default connect(mapState, mapDispatch)(Transactions)
