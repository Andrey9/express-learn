const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/User')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  const user = await User.findOne({email: email}).select('+password')

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

  console.log(userJson)
  done(null, userJson)
}))

module.exports = passport
