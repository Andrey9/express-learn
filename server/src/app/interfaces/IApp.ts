import { Application } from 'express';

export interface IApp {
  init (): Application;
}
