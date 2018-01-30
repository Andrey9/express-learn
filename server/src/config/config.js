module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: 'express',
    user: 'express',
    password: 'express',
    options: {
      dialect: 'sqlite',
      storage: './express.sqlite'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'express-test-app-jwt-secret'
  }
}
