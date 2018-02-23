const User = require('../models/User')

module.exports = {
  async index (req, res, next) {
    try {
      const users = await User.find({})

      res.json(users)
    } catch (err) {
      next(err)
    }
  }
}
