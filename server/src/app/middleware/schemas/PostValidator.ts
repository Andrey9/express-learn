import * as Joi from 'joi';

export class PostValidator {
  public static create: Joi.Schema =  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
  });
}
