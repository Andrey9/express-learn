const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const jwtSingUser = user => {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (error) {
      res.status(400).send({
        error: `Email ${req.body.email} is already in use`
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        res.status(403).send({
          error: 'User with such email wasn\'t found'
        })
      }
      const isPassCorrect = user.comparePassword(password)

      if (!isPassCorrect) {
        res.status(403).send({
          error: 'Incorrect password'
        })
      }

      const userJson = user.toJSON()

      res.send({
        user: userJson,
        token: jwtSingUser(userJson)
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: 'Error occurred while trying to log in',
        error: error
      })
    }
  }
}
