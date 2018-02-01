const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true
  },
  password: {
    type: String,
    select: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  userInfo: []
}, {timestamps: true})

if (!UserSchema.options.toJSON) UserSchema.options.toJSON = {}
UserSchema.options.toJSON.transform = function (doc, ret, options) {
  delete ret.isAdmin
  delete ret.password
  return ret
}

module.exports = mongoose.model('User', UserSchema)
