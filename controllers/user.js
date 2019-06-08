const crypto = require('crypto')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const errors = require('../errors')
const BaseController = require('./base')

const validateUser = (details, type) => {
  if (type === 'register') {
    if (!details.email || !details.password ||
      !details.firstName || !details.lastName) {
      return false
    }
  } else if (type === 'login') {
    if (!details.email || !details.password) {
      return false
    }
  }

  return true
}

class UserController extends BaseController {
  constructor() {
    super(User)
  }

  async create(data) {
    if (!Object.keys(data).length || !validateUser(data, 'register')) {
      throw new errors.ValidationError('Invalid user details')
    }

    try {
      const result = await super.create(data)
      return result
    } catch (err) {
      // If there is a duplicate key error, throw
      // a customized error
      if (err.code === 11000) {
        throw new errors.ValidationError('User with this email already exists')
      }

      throw err
    }
  }

  async authenticate (data) {
    if (!Object.keys(data).length || !validateUser(data, 'login')) {
      throw new errors.ValidationError('Invalid user details')
    }
  
    const { email, password } = data
  
    const user = await this.model.findOne()
      .where('email').equals(email.toLowerCase())
      .exec()

    if (!user) {
      throw new errors.NotFound('User not found')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new errors.ValidationError('Password is incorrect')
    }

    user.token = crypto.randomBytes(60).toString('hex')
    const loginUser = await user.save()

    return loginUser.format()
  }
}

module.exports = UserController
