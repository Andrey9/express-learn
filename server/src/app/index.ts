import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from './config/passport';
import { json, urlencoded } from 'body-parser';
import { IApp } from './interfaces/IApp';
import { CONTROLLERS } from './controllers';

export class App implements IApp {
  private app: express.Application;

  constructor () {
    this.app = express();
  }

  public init (): express.Application {
    this.setMiddlewares();
    this.setRoutes();
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
}
