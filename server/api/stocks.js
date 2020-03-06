const router = require('express').Router()
const axios = require('axios')

// GET ROUTES
router.get('/:symbol', async (req, res, next) => {
  try {
    const { symbol } = req.params
    const API_KEY = process.env.IEX_API_KEY

    const stock = await axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
      )
      .catch(err => {
        console.log(err.message)
        console.log(err.stack)
        res.status(400).send(`Invalid ticker symbol: ${symbol}.`)
      })
    const stockData = stock.data

    if (stockData) {
      res.status(200).json(stockData)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
