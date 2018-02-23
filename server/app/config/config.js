module.exports = {
  db: process.env.MONGO_URL || 'mongodb://localhost:27017/expressRestDB',
  port: process.env.PORT || 8081,
  jwt: {
    secret: process.env.JWT_SECRET || 'express-rest-jwt-secret',
    expires: process.env.JWT_EXPIRES || 1200
  }
}
