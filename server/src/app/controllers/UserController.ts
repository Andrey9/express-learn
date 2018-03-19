import { IController } from '../interfaces/IController';
import { Application, Request, Response, NextFunction } from 'express';

export class UserController implements IController {
  public init (app: Application): void {
    app.get('/', this.index);
  }

  private index (req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: 'Hello world!' });
    } catch (err) {
      next(err);
    }
  }
}
