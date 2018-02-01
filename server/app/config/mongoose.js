const mongoose = require('mongoose')
const bluebird = require('bluebird')

module.exports = mongoUrl => {
  const options = {
    promiseLibrary: bluebird
  }

  mongoose.Promise = bluebird
  mongoose.connect(mongoUrl, options)

  const db = mongoose.connection
  const events = ['error', 'reconnected', 'connected', 'disconnected', 'closed']
  events.forEach(event => {
    db.on(event, msg => {
      if (msg) {
        console.log(`Mongoose: ${event}`, msg)
      } else {
        console.log(`Mongoose: ${event}`)
      }
    })
  })

  return new Promise((resolve, reject) => {
    db.once('open', () => {
      resolve(mongoose)
    })
    db.once('error', reject)
  })
}
