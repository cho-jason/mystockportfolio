const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// HOOKS
const capitalizeSymbol = stock => {
  stock.symbol = stock.symbol.toUpperCase()
}

Stock.beforeCreate(capitalizeSymbol)

module.exports = Stock
