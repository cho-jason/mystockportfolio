const User = require('./user')
const Stock = require('./stock')
const Transaction = require('./transaction')

// ASSOCIATIONS
Stock.belongsTo(User)
Transaction.belongsTo(User)
User.hasMany(Stock)
User.hasMany(Transaction)

module.exports = { User, Stock, Transaction }
