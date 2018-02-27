const Joi = require('joi')
module.exports = (schema) => {
  return (req, res, next) => {
    const input = req.body || {}

    const result = Joi.validate(input, schema, {abortEarly: false})

    if (result.error) {
      result.error.status = 400
      return next(result.error)
    }

    return next()
  }
}
