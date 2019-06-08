const merge = require('lodash.merge');

const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  MONGODB_URI: 'mongodb://localhost:27017/help',
  PORT: 3000,
  LOG_LEVEL: 'warn'
}

let envConfig = {}

switch (env) {
  case 'development':
    envConfig = require('./dev.env')
    break;
  case 'production':
    envConfig = require('./prod.env')
    break;
  case 'testing':
    envConfig = require('./test.env')
    break;
  default:
    envConfig = require('./dev.env')
}

module.exports = merge(baseConfig, envConfig)
