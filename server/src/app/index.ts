import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import { IApp } from './interfaces/IApp';

export class App implements IApp {
  private app: express.Application;

  constructor () {
    this.app = express();
  }

  public init (): express.Application {
    this.setMiddlewares();
    return this.app;
  }

  private setMiddlewares () {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    // this.app.use(passport.initialize());
  }
}
