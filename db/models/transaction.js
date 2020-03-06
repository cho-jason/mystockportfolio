const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  stockSymbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // pricePerShare is in pennies to avoid precision errors
  pricePerShare: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  }
})

// HOOKS
const capitalizeStockSymbol = transaction => {
  transaction.stockSymbol = transaction.stockSymbol.toUpperCase()
}

Transaction.beforeCreate(capitalizeStockSymbol)

module.exports = Transaction
