const passport = require('passport')
const LocalStrategy = require('passport-local')
const UserService = require('../services/userService')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, UserService.signIn))

module.exports = passport
