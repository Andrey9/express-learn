const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const passport = require('../config/passport')
const {jwt} = require('../config/config')
const expressJWT = require('express-jwt')
const authenticate = expressJWT({secret: jwt.secret})

/* GET users listing. */
router.get('/me', authenticate, function (req, res, next) {
  res.json({message: 'respond with a resource'})
})

// Authentication routes
router.post('/login', passport.authenticate('local', {session: false}), AuthController.login)
router.post('/register', AuthController.register)
router.post('/testuser', AuthController.testuser)

module.exports = router
