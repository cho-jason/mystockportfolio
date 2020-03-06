const router = require('express').Router()
const fetch = require('node-fetch')
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
  try {
    // const { symbol, shares, userId } = req.body
    const symbol = req.body.symbol
    const shares = parseInt(req.body.shares)
    const userId = parseInt(req.body.userId)
    const API_KEY = process.env.IEX_API_KEY

    const stockData = await fetch(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
    )
      .then(iexRes => iexRes.json())
      .catch(err => {
        console.log(err.message)
        console.log(err.stack)
        res.status(400).send(`Invalid ticker symbol: ${symbol}`)
      })

    if (stockData) {
      // Note: stockData.latestPrice is in dollars
      const totalCost = shares * stockData.latestPrice * 100
      // Note: user.balance is in pennies
      let user = await User.findByPk(userId)

      // If user has insufficient balance to buy stock shares,
      // notify user of bad request
      if (user.balance < totalCost) {
        res.status(400).send('Insufficient balance.')

        // Othewise, purchase x amount of stock shares
      } else {
        // 1. Create new transaction
        const transaction = await Transaction.create({
          stockSymbol: symbol,
          pricePerShare: stockData.latestPrice * 100,
          shares
        })
        await user.addTransaction(transaction)

        // 2. Add stock to portfolio / update stock shares in portfolio
        let purchasedStock = await Stock.findOne({
          where: { userId }
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

        res.status(201).json(transaction)
      }
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
