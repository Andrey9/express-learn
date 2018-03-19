const User = require('../models/user')

module.exports = {
  /**
   * Function for signing in user by credentials
   * Check if user with given email exists in DB
   * and compare his password with given
   *
   * @param username
   * @param password
   * @param done
   * @returns {Promise<*>}
   */
  signIn: async (username, password, done) => {
    const user = await User.findOne({email: username}).select('+password')

    if (!user) {
      const err = new Error('User with such email not found')
      err.status = 401
      return done(err, false)
    }
    const isPassCorrect = await user.comparePass(password)

    if (!isPassCorrect) {
      const err = new Error('Password is incorrect')
      err.status = 401
      done(err, false)
    }

    const userJson = user.toJSON()
    done(null, userJson)
  }
}
