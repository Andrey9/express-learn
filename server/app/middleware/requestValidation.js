const Joi = require('joi')
module.exports = (schema) => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema, {abortEarly: false})

    if (result.error) {
      result.error.status = 400
      return next(result.error)
    }

    return next()
  }
}
