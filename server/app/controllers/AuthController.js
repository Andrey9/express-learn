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

  async testuser (req, res) {
    const user = await User.create({
      email: 'email@example.com',
      password: 'secret'
    })

    console.log(user.toJSON())
    res.json({
      user: user.toJSON(),
      message: 'saved'
    })
  }

}
