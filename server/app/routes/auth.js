const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')
const passport = require('../config/passport')

router.post('/login', passport.authenticate('local', {session: false}), AuthController.login)
router.post('/register', AuthController.register)
router.post('/testuser', AuthController.testuser)

module.exports = router
