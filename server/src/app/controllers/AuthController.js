const User = require('../models/User')
const JWToken = require('jsonwebtoken')
const {jwt} = require('../config/config')

const generateToken = (user) => {
  return JWToken.sign(user, jwt.secret, {
    expiresIn: jwt.expires
  })
}

module.exports = {
  login (req, res) {
    res.json({
      user: req.user,
      token: generateToken(req.user)
    })
  },

  async register (req, res, next) {
    try {
      const {email, password, ...userInfo} = req.body
      const user = new User({
        email: email,
        password: password,
        userInfo: userInfo
      })

      await user.save()

      res.json({
        user: user.toJSON(),
        token: generateToken(user.toJSON())
      })
    } catch (err) {
      next(err)
    }
  }
}
