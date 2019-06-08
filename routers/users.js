const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const controller = require('../controllers/user')
const errors = require('../errors')
const helpers = require('./helpers')

class UsersCRUD extends helpers.CRUD {
  async authenticate(req, res) {
    const controller = this.getController()

    try {
      const user = await controller.authenticate(req.body)
      res.json(user)
    } catch (err) {
      errors.handler(req, res)(err)
    }
  }

  connectTo(router) {
    router.post('/register', this.create.bind(this))
    router.post('/login', this.authenticate.bind(this))
  }
}

router.get('/me', auth.tokenMiddleware, (req, res) => {
  res.json(req.user)
})

const usersCRUD = new UsersCRUD(controller)
usersCRUD.connectTo(router)

module.exports = router
