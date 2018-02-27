module.exports = {
  db: process.env.MONGO_URL || 'mongodb://localhost:27017/expressRestDB',
  testDB: process.env.TEST_MONGO_URL || 'mongodb://localhost:27017/test',
  port: process.env.PORT || 8081,
  jwt: {
    secret: process.env.JWT_SECRET || 'express-rest-jwt-secret',
    expires: process.env.JWT_EXPIRES || 1200
  }
}
