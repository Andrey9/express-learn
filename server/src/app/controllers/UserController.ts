import { IController } from '../interfaces/IController';
import { Application, Request, Response, NextFunction } from 'express';
import { UserService } from '../services';

export class UserController implements IController {
  public init (app: Application): void {
    app.get('/users', this.index);
  }

  private async index (req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ users });
    } catch (err) {
      next(err);
    }
  }
}
