const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const {jwt} = require('../config/config')
const expressJWT = require('express-jwt')
const authenticate = expressJWT({secret: jwt.secret})
const Request = require('../middleware/requestValidation')
const UserValidator = require('../middleware/validators/UserValidator')

/* Controllers */
const AuthController = require('../controllers/AuthController')
const UserController = require('../controllers/UserController')

/* GET users listing. */
router.get('/users', authenticate, UserController.index)

// Authentication routes
router.post('/login', Request(UserValidator.login), passport.authenticate('local', {session: false}), AuthController.login)
router.post('/register', Request(UserValidator.register), AuthController.register)

module.exports = router
