const User = require('./user')
const Stock = require('./stock')

// ASSOCIATIONS
Stock.belongsTo(User)
User.hasMany(Stock)

module.exports = { User, Stock }
