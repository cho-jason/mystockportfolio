const router = require('express').Router()
const axios = require('axios')
const { User, Stock, Transaction } = require('../../db/models')

// GET ROUTES
router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll()
    res.status(200).json(transactions)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const transaction = await Transaction.findByPK(id)
    res.status(200).json(transaction)
  } catch (err) {
    next(err)
  }
})

// POST ROUTES
router.post('/', async (req, res, next) => {
  const symbol = req.body.symbol
  const shares = req.body.shares
  const userId = req.body.userId
  const API_KEY = process.env.IEX_API_KEY

  try {
    const stock = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
    )
    // Note: stockPrice is price per share in pennies
    const stockPrice = Math.round(stock.data.latestPrice * 100)
    const totalCost = shares * stockPrice
    // Note: user.balance is in pennies
    let user = await User.findByPk(userId)

    // If user has insufficient funds, notify user of bad request
    if (user.balance < totalCost) {
      res.status(400).send('Insufficient balance.')

      // Othewise, purchase x amount of stock shares
    } else {
      // 1. Create new transaction
      const transaction = await Transaction.create({
        stockSymbol: symbol,
        pricePerShare: stockPrice,
        shares
      })
      await user.addTransaction(transaction)

      // 2. Add stock to portfolio / update stock shares in portfolio
      let purchasedStock = await Stock.findOne({
        where: { userId, symbol }
      })

      if (!purchasedStock) {
        purchasedStock = await Stock.create({
          symbol,
          shares
        })
        await user.addStock(purchasedStock)
      } else {
        purchasedStock.shares = purchasedStock.shares + shares
        await purchasedStock.save()
      }

      // 3. Update user balance
      user.balance = user.balance - totalCost
      await user.save()

      // 4. Add userId to response transaction obj
      transaction.userId = user.id

      res.status(201).json(transaction)
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      res.status(404).send(`Invalid ticker symbol: ${symbol}.`)
    } else {
      next(err)
    }
  }
})

module.exports = router
