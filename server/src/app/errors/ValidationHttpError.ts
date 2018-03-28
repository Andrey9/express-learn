import { HttpError } from './HttpError';
import { ValidationError, ValidationErrorItem } from 'joi';

export interface IValidationHttpError {
  details: ValidationErrorItem[];
}

export class ValidationHttpError extends HttpError implements IValidationHttpError {
  details: ValidationErrorItem[];

  constructor (error: ValidationError) {
    super(400, error.message);
    this.details = error.details;
    this.name = 'ValidationHttpError';
  }
}
