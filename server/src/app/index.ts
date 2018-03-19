import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from './config/passport';
import { json, urlencoded } from 'body-parser';
import { IApp } from './interfaces/IApp';
import { CONTROLLERS } from './controllers';
import { HttpError } from './errors/HttpError';

export class App implements IApp {
  private app: express.Application;

  constructor () {
    this.app = express();
  }

  public init (): express.Application {
    this.setMiddlewares();
    this.setRoutes();
    this.app.use(this.notFoundHandler);
    this.app.use(this.errorHandler);
    return this.app;
  }

  private setMiddlewares () {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(passport.initialize());
  }

  private setRoutes () {
    for (const controller of CONTROLLERS) {
      controller.init(this.app);
    }
  }

  private notFoundHandler (
    res: express.Request,
    req: express.Response,
    next: express.NextFunction
  ) {
    const err = new HttpError(404,'Not Found');
    next(err);
  }

  private errorHandler (err: any, req: express.Request, res: express.Response) {
    const error = req.app.get('env') === 'development' ? err : {};
    const message = err.message;
    const status: number = err.status ? err.status : 500;
    res.status(status);
    res.json({ message, error });
  }
}
