const sockets = require('./sockets')

exports.init = io => {
  sockets.initialize(io)
  return Promise.resolve()
}