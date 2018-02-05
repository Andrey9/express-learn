const api = require('./api')

module.exports = (app) => {
  // app routes
  app.use('/api/v1', api)
  // app.use('/', front)
}
