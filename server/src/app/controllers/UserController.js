const User = require('../models/user')

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
