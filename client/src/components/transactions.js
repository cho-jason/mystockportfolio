import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getTransactions } from '../store'

const Transactions = ({ userId, transactions, getTransactions }) => {
  // EFFECTS
  useEffect(() => {
    getTransactions(userId)
  }, [])

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.map(transaction => {
        const { id, stockSymbol, shares, pricePerShare, date } = transaction
        return (
          <div key={id}>
            {date} | {stockSymbol}: {shares} shares @ {pricePerShare}
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
