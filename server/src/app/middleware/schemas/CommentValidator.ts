import * as Joi from 'joi';

export class CommentValidator {
  public static create: Joi.Schema =  Joi.object({
    comment: Joi.string().required()
  });
}
