const mongoose = require('mongoose')
const config = require('../app/config/config')
const userSeeder = require('./modelSeeders/user');

(async function () {
  await mongoose.connect(config.db)

  await userSeeder(10)

  mongoose.disconnect()
})()
