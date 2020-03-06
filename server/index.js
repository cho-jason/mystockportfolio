const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const passport = require('passport')
const db = require('../db')
const PORT = process.env.PORT || 3001

// Load secets if non-production environments
if (process.env.NODE_ENV !== 'production') require('../secrets')

// Register passport
passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (err) {
    done(err)
  }
})
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.models.user.findByPK(userId)
    done(null, user)
  } catch (err) {
    next(err)
  }
})

// Middleware
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Create our database store
const dbStore = new SequelizeStore({ db })
// Sync database store so table can be created in db
dbStore.sync()
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: dbStore,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api', require('./api'))

// Send HTML file for our SPA
app.get('*', (req, res) => {
  res.sendFile(path.join, '../client/build/index.html')
})

// Error Handling
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}

    http://localhost:${PORT}
    `)
  })
})
