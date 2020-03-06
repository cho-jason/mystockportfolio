const router = require('express').Router()
const axios = require('axios')

// GET ROUTES
router.get('/:symbol', async (req, res, next) => {
  const { symbol } = req.params
  const API_KEY = process.env.IEX_API_KEY

  try {
    const stock = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`
    )
    res.status(200).json(stock.data)
  } catch (err) {
    if (err.response.status === 404) {
      res.status(404).send(`Invalid ticker symbol: ${symbol}.`)
    } else {
      next(err)
    }
  }
})

module.exports = router
