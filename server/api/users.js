const router = require('express').Router()
const { User, Stock, Transaction } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],
      order: [['id', 'ASC']]
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

// GET ROUTES
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/stocks', async (req, res, next) => {
  try {
    const { id } = req.params
    const stocks = await Stock.findAll({
      where: { userId: id },
      order: [['symbol', 'ASC']]
    })
    res.status(200).json(stocks)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/transactions', async (req, res, next) => {
  try {
    const { id } = req.params
    const transactions = await Transaction.findAll({
      where: { userId: id },
      order: [['date', 'ASC']]
    })
    res.status(200).json(transactions)
  } catch (err) {
    next(err)
  }
})

module.exports = router
