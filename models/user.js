const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  firstName: {
    trim: true,
    type: String
  },
  lastName: {
    trim: true,
    type: String
  },
  email: {
    trim: true,
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  token: {
    type: String
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  const hash = await bcrypt.hash(user.password, 10)

  user.password = hash
  return next()
})

// Defining methods
userSchema.methods.format = function () {
  const user = this.toObject()
  delete user.password

  return user
}

module.exports = mongoose.model('User', userSchema)
