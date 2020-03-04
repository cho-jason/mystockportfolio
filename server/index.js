const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 3001

// Middleware
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}

  http://localhost:${PORT}
  `)
})
