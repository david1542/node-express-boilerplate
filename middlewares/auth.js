const User = require('../models/user')
const errors = require('../errors')

const findUserWithToken = async token => {
  const user = await User.findOne()
    .where('token').equals(token)
    .where('status').equals('approved')
    .where('deletedAt').exists(false)
    .exec()
  
  return user
}

exports.tokenMiddleware = async (req, res, next) => {
  var token = req.headers['token'] || req.query.token

  // Missing token
  if (!token || token.length !== 120) {
    return errors.handler(req, res)(new errors.UnauthenticatedAccess('Missing token'))
    // We have a token
  } else {
    const user = await findUserWithToken(token)
    if (!user) {
      return errors.handler(req, res)(new errors.UnauthenticatedAccess('Token is invalid'))
    }

    req.user = user
    next()
  }
}

exports.force_https = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url)
    }
  }
  next()
}
