const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    })

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(422).send({
            error: 'Please, provide a valid email'
          })
          break
        case 'password':
          res.status(422).send({
            error: 'Password should consist of letters and numbers and be at least 8 characters'
          })
          break
        default:
          res.status(422).send({
            error: 'Invalid registration data'
          })
          break
      }
    }

    next()
  }
}
