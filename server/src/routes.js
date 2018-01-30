const AuthController = require('./controllers/AuthController')
const AuthPolicy = require('./policies/AuthPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthPolicy.register, // method for validating request
    AuthController.register)

  app.post('/login', AuthController.login)
}
