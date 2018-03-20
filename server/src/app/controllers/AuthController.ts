import { IController } from '../interfaces/IController';
import { UserService } from '../services/UserService';
import { Application, Request, Response, NextFunction } from 'express';
import passport from '../config/passport';

export class AuthController implements IController {
  init (app: Application) {
    app.post('/auth/login', passport.authenticate('local', { session: false }), this.login);
    app.post('/auth/register', this.register);
  }

  private login (req: Request, res: Response) {
    res.json({
      user: req.user,
      token: UserService.generateToken(req.user)
    });
  }

  private async register (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, ...userInfo } = req.body;
      // const user = new User({
      //   email,
      //   password,
      //   userInfo
      // });
      //
      // await user.save();

      res.json({
        // user: user.toJSON(),
        // token: UserService.generateToken(user.toJSON())
      });
    } catch (err) {
      next(err);
    }
  }
}
