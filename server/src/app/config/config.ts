export default {
  db: 'mongodb://localhost:27017/expressRestDB',
  testDB: 'mongodb://localhost:27017/test',
  port: 8081,
  jwt: {
    secret: 'express-rest-jwt-secret',
    expires: 1200
  }
};
