const api = require('./modules/api')

module.exports = (app) => {
  app.use('/api/v1', api)
}
