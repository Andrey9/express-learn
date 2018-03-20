export default {
  db: process.env.MONGO_CONNECTION ?
    process.env.MONGO_CONNECTION :
    'mongodb://localhost:27017/expressRestDB',
  testDB: 'mongodb://localhost:27017/test',
  port: process.env.PORT ? +process.env.PORT : 8000,
  jwt: {
    secret: process.env.JWT_SECRET ?
      process.env.JWT_SECRET :
      'express-rest-jwt-secret',
    expires: process.env.JWT_EXPIRES ? +process.env.JWT_EXPIRES : 1200
  }
};
