const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/transactions', require('./transactions'))
router.use('/stocks', require('./stocks'))

module.exports = router
