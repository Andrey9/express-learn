export interface IHttpError {
  status?: number;
}

export class HttpError extends Error implements IHttpError {
  status: number;

  constructor (status: number = 500, message: string) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}
