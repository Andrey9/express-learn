import { Application } from 'express';

export interface IController {
  init (app: Application): void;
}
