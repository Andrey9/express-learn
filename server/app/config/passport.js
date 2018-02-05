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
    return done(null, false)
  }
  const isPassCorrect = await user.comparePass(password)

  if (!isPassCorrect) {
    return done(null, false)
  }

  const userJson = user.toJSON()

  console.log(userJson)
  done(null, userJson)
}))

module.exports = passport
