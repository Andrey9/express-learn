import { Schema, validate } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ValidationHttpError } from '../errors/ValidationHttpError';

export const validateInput = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const input: object = req.body ? req.body : {};

    const result = validate(input, schema, { abortEarly: false });

    if (result.error !== null) {
      const error = new ValidationHttpError(result.error);
      return next(error);
    }

    return next();
  };
};
