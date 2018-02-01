const {api, jwt} = require('../config/config')
const users = require('../routes/users')
const auth = require('../routes/auth')
const expressJWT = require('express-jwt')
const authenticate = expressJWT({secret: jwt.secret})

module.exports = (app) => {
  // app routes
  app.use(`${api.prefix}/users`, authenticate, users)
  app.use(`${api.prefix}/auth`, auth)
}
