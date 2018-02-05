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
    res.send({
      user: req.user,
      token: generateToken(req.user)
    })
  },

  register (req, res) {
  },

  async testuser (req, res, next) {
    try {
      const user = new User({
        email: 'nessw@example.com',
        password: 'secret'
      })

      await user.save()

      res.json({
        user: user.toJSON(),
        message: 'saved'
      })
    } catch (error) {
      next(error)
    }
  }
}
