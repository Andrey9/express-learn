const Joi = require('joi')

/**
 * Validation schemas for authentication
 *
 * @type {{login: *, register: *}}
 */
module.exports = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required()
  }),
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
    password_confirmation: Joi.string().alphanum().required().valid(Joi.ref('password')),
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    phone: Joi.string().min(6).max(12),
    birthDate: Joi.date().max('now')
  })
}
