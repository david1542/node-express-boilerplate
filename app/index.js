const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('../middlewares/auth')
const appPackage = require('../package')
const events = require('../events')
const appRouter = require('../routers')
const database = require('../models')

app.use(cors())
app.use(auth.force_https)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Global router
app.use('/api', appRouter)

app.get(/^\/$/, (req, res) => {
  const { name, version } = appPackage
  res.json({ name, version })
})

app.initialize = (io) => Promise.all([
  database.init(),
  events.init(io)
])

module.exports = app
