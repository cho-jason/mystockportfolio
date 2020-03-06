const router = require('express').Router()
const { User } = require('../../db/models')

router.get('/me', (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    res.status(404).send('User not found.')
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      res.status(401).send('Incorrect email and / or password.')
    } else if (!user.isPasswordCorrect(password)) {
      res.status(401).send('Incorrect email and / or password.')
    } else {
      req.login(user, err => {
        if (err) {
          next(err)
        } else {
          res.status(200).json(user)
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.create({ email, password })
    req.login(user, err => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(user)
      }
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.sendStatus(204)
})

module.exports = router
