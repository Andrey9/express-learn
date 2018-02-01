const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const encryptPassword = (password) => {
  return bcrypt.genSalt(8)
    .then(salt => bcrypt.hash(password, salt))
}

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

UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  user.password = encryptPassword(user.password)
  next()
})

if (!UserSchema.options.toJSON) UserSchema.options.toJSON = {}
UserSchema.options.toJSON.transform = function (doc, ret, options) {
  delete ret.isAdmin
  delete ret.password
  return ret
}

module.exports = mongoose.model('User', UserSchema)
