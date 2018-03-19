const mongoose = require('mongoose')
const bCrypt = require('bcrypt')

const encryptPassword = (password) => {
  return bCrypt.genSalt(8)
    .then(salt => bCrypt.hash(password, salt))
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
  userInfo: {
    firstName: String,
    lastName: String,
    phone: String,
    birthDate: Date,
    avatar: String
  }
}, {timestamps: true})

UserSchema.methods.comparePass = async function (password) {
  return bCrypt.compare(password, this.password)
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await encryptPassword(this.password)
  next()
})

if (!UserSchema.options.toJSON) UserSchema.options.toJSON = {}
UserSchema.options.toJSON.transform = function (doc, ret, options) {
  delete ret.password
  return ret
}

module.exports = mongoose.model('User', UserSchema)
